import re
from collections import Counter


def clean_and_tokenize(text):
    if not text:
        return set()
    # Normalize text to lower case and split by words/punctuation
    words = re.findall(r'\b[a-zA-Z0-9+#\.]+\b', text.lower())
    # Filter out common stop words
    stopwords = {
        'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'for', 'with', 'to', 'of',
        'is', 'are', 'was', 'were', 'be', 'been', 'with', 'by', 'as', 'at', 'from',
        'ready', 'looking', 'work', 'job', 'developer', 'engineer', 'role'
    }
    return {w for w in words if w not in stopwords and len(w) > 1}


def calculate_jaccard_similarity(set1, set2):
    if not set1 or not set2:
        return 0.0
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / float(len(union))


class AIService:
    @staticmethod
    def get_job_recommendations(user, jobs_queryset, limit=6):
        """
        Ranks jobs for a candidate user based on skill vector matching & profile similarity.
        """
        profile = getattr(user, 'profile', None)
        if not profile:
            # Return latest published jobs if no profile exists
            return [{"job": job, "match_score": 70} for job in jobs_queryset[:limit]]

        candidate_text = f"{profile.skills} {profile.bio} {profile.education} {profile.experience}"
        candidate_tokens = clean_and_tokenize(candidate_text)

        if not candidate_tokens:
            return [{"job": job, "match_score": 75} for job in jobs_queryset[:limit]]

        scored_jobs = []
        for job in jobs_queryset:
            job_text = f"{job.title} {job.description} {job.skills_required} {job.location}"
            job_tokens = clean_and_tokenize(job_text)
            
            similarity = calculate_jaccard_similarity(candidate_tokens, job_tokens)
            
            # Base match score between 50% and 98% based on similarity
            match_score = int(50 + (similarity * 48))
            
            # Bonus if title words match candidate skills
            for token in candidate_tokens:
                if token in job.title.lower():
                    match_score = min(99, match_score + 10)
                    break

            scored_jobs.append({
                "job": job,
                "match_score": match_score
            })

        # Sort by match score descending
        scored_jobs.sort(key=lambda x: x["match_score"], reverse=True)
        return scored_jobs[:limit]

    @staticmethod
    def analyze_resume_skill_gap(candidate_profile, job):
        """
        Calculates skill gap analysis between candidate profile and a specific job.
        """
        candidate_skills = clean_and_tokenize(candidate_profile.skills if candidate_profile else "")
        job_skills = clean_and_tokenize(f"{job.skills_required} {job.title}")

        if not job_skills:
            job_skills = {"python", "javascript", "react", "django", "git", "sql"}

        matched_skills = list(candidate_skills.intersection(job_skills))
        missing_skills = list(job_skills.difference(candidate_skills))

        total_req = max(len(job_skills), 1)
        score = int((len(matched_skills) / total_req) * 100)
        score = max(35, min(98, score))  # keep realistic bounds

        suggested_skills = [
            f"Master {skill.upper()}" for skill in missing_skills[:4]
        ]
        if not suggested_skills:
            suggested_skills = ["System Design & Architecture", "CI/CD & DevOps Pipeline", "Unit Testing & QA"]

        return {
            "match_percentage": score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "suggested_actions": suggested_skills,
            "summary": f"Your profile matches {score}% of the core technical requirements for {job.title}."
        }

    @staticmethod
    def calculate_candidate_match_score(candidate_profile, job):
        """
        Calculates employer candidate match score for applicant evaluation.
        """
        if not candidate_profile:
            return 50

        cand_text = f"{candidate_profile.skills} {candidate_profile.experience} {candidate_profile.education}"
        cand_tokens = clean_and_tokenize(cand_text)
        job_tokens = clean_and_tokenize(f"{job.title} {job.skills_required} {job.description}")

        if not cand_tokens or not job_tokens:
            return 60

        similarity = calculate_jaccard_similarity(cand_tokens, job_tokens)
        score = int(45 + (similarity * 53))
        return min(99, max(40, score))
