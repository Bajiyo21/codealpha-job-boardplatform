from django.core.management.base import BaseCommand
from accounts.models import User, CandidateProfile
from companies.models import Company
from jobs.models import Job, SavedJob
from applications.models import Application
from core.models import Notification
from datetime import date, timedelta


class Command(BaseCommand):
    help = "Seeds database with realistic startup job portal demo data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding demo data...")

        # 1. Create Demo Candidate
        cand_user, _ = User.objects.get_or_create(
            email="candidate@careernest.com",
            defaults={
                "name": "Alex Morgan",
                "phone": "+1 555-0192",
                "role": "candidate",
                "is_verified": True,
            }
        )
        if _:
            cand_user.set_password("password123")
            cand_user.save()

        profile, _ = CandidateProfile.objects.get_or_create(
            user=cand_user,
            defaults={
                "headline": "Senior Full Stack React & Django Engineer",
                "location": "San Francisco, CA (Remote)",
                "education": "B.S. Computer Science - Stanford University",
                "experience": "4+ Years in Full Stack Development",
                "skills": "React, TypeScript, Python, Django, REST APIs, PostgreSQL, TailwindCSS, Docker, AWS",
                "bio": "Passionate full-stack developer with 4 years of experience building high-scale SaaS web applications and startup products.",
                "github": "https://github.com",
                "linkedin": "https://linkedin.com",
                "portfolio": "https://alexmorgan.dev",
            }
        )

        # 2. Create Demo Employers & Companies
        employers_data = [
            {
                "email": "hr@stripe.com",
                "name": "Sarah Connor",
                "company_name": "Stripe",
                "industry": "Fintech & Payments",
                "website": "https://stripe.com",
                "location": "San Francisco, CA",
                "size": "5000+ employees",
                "desc": "Stripe is a suite of payment APIs powering online commerce for internet businesses.",
                "jobs": [
                    {
                        "title": "Staff Frontend Engineer - React",
                        "desc": "Join our core UI platform team building financial infrastructure for the internet. You will design, build, and deploy high performance React micro-frontends.",
                        "skills": "React, TypeScript, GraphQL, Webpack, Modern CSS, Performance Optimization",
                        "type": "full_time",
                        "mode": "remote",
                        "salary": 165000,
                        "exp": "4-6 years",
                        "featured": True,
                    },
                    {
                        "title": "Senior Backend Developer - Python/Django",
                        "desc": "We are seeking a Senior Backend Engineer to architect scalable transaction pipelines processing millions of daily API requests.",
                        "skills": "Python, Django, PostgreSQL, Redis, Microservices, System Design",
                        "type": "full_time",
                        "mode": "hybrid",
                        "salary": 175000,
                        "exp": "5+ years",
                        "featured": True,
                    }
                ]
            },
            {
                "email": "hiring@vercel.com",
                "name": "Guillermo Rauch",
                "company_name": "Vercel",
                "industry": "Cloud & Frontend DevTools",
                "website": "https://vercel.com",
                "location": "Remote",
                "size": "200-500 employees",
                "desc": "Vercel is the developer cloud for frontend web applications powering Next.js and web performance.",
                "jobs": [
                    {
                        "title": "Frontend Architect - Next.js & React",
                        "desc": "Lead our Core Framework engineering team. Innovate on Server Components, Edge Middleware, and real-time streaming interfaces.",
                        "skills": "React 19, Next.js, TypeScript, TailwindCSS, Edge Computing",
                        "type": "full_time",
                        "mode": "remote",
                        "salary": 180000,
                        "exp": "5+ years",
                        "featured": True,
                    },
                    {
                        "title": "UI/UX Designer & Frontend Developer",
                        "desc": "Craft stunning, pixel-perfect user interfaces and sleek micro-interactions across Vercel dashboard and component design systems.",
                        "skills": "Figma, TailwindCSS, Framer Motion, React, CSS Architecture",
                        "type": "full_time",
                        "mode": "remote",
                        "salary": 140000,
                        "exp": "3+ years",
                        "featured": False,
                    }
                ]
            },
            {
                "email": "careers@supabase.com",
                "name": "Paul Copplestone",
                "company_name": "Supabase",
                "industry": "Database & Open Source",
                "website": "https://supabase.com",
                "location": "Singapore / Remote",
                "size": "50-200 employees",
                "desc": "The Open Source Firebase Alternative. Instant Postgres database, Auth, Storage, and Realtime APIs.",
                "jobs": [
                    {
                        "title": "Full Stack Engineer - Django & React",
                        "desc": "Build next-generation developer tooling. Bridge Postgres database APIs with interactive React interfaces.",
                        "skills": "Python, Django, React, PostgreSQL, WebSockets, REST APIs",
                        "type": "full_time",
                        "mode": "remote",
                        "salary": 150000,
                        "exp": "2-4 years",
                        "featured": True,
                    },
                    {
                        "title": "Software Engineering Intern - Cloud Services",
                        "desc": "Exciting internship opportunity for students and recent grads to learn distributed cloud backend systems.",
                        "skills": "Python, JavaScript, Git, SQL, Docker",
                        "type": "internship",
                        "mode": "remote",
                        "salary": 60000,
                        "exp": "0-1 years",
                        "featured": False,
                    }
                ]
            }
        ]

        for emp in employers_data:
            emp_user, created = User.objects.get_or_create(
                email=emp["email"],
                defaults={
                    "name": emp["name"],
                    "role": "employer",
                    "is_verified": True,
                }
            )
            if created:
                emp_user.set_password("password123")
                emp_user.save()

            company, _ = Company.objects.get_or_create(
                owner=emp_user,
                defaults={
                    "company_name": emp["company_name"],
                    "industry": emp["industry"],
                    "website": emp["website"],
                    "location": emp["location"],
                    "company_size": emp["size"],
                    "description": emp["desc"],
                    "is_verified": True,
                }
            )

            for jdata in emp["jobs"]:
                job, created_job = Job.objects.get_or_create(
                    company=company,
                    title=jdata["title"],
                    defaults={
                        "description": jdata["desc"],
                        "skills_required": jdata["skills"],
                        "job_type": jdata["type"],
                        "work_mode": jdata["mode"],
                        "location": emp["location"],
                        "salary": jdata["salary"],
                        "experience": jdata["exp"],
                        "status": "published",
                        "is_featured": jdata["featured"],
                        "deadline": date.today() + timedelta(days=30),
                    }
                )

                if created_job and cand_user:
                    # Apply for 2 jobs
                    if "Full Stack" in job.title or "Staff Frontend" in job.title:
                        Application.objects.get_or_create(
                            candidate=cand_user,
                            job=job,
                            defaults={
                                "cover_letter": "I am deeply impressed by your company's mission and culture. With 4+ years of hands-on experience in React & Django, I can immediately contribute to your product suite.",
                                "status": "shortlisted" if "Staff Frontend" in job.title else "applied",
                            }
                        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded CareerNest demo data!"))
