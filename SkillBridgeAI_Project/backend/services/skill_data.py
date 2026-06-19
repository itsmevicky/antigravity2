# skill_data.py

ROLES_DB = {
    "AI Engineer": {
        "required": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "LLMs"],
        "nice_to_have": ["Docker", "Kubernetes", "AWS/GCP", "SQL", "Vector Databases", "LangChain"],
        "categories": ["AI/ML", "Programming", "Cloud/Ops"]
    },
    "Data Scientist": {
        "required": ["Python", "SQL", "Statistics", "Machine Learning", "Pandas", "Scikit-Learn", "Data Visualization"],
        "nice_to_have": ["R", "Tableau", "Power BI", "Spark", "Hadoop"],
        "categories": ["Data", "Programming", "Math/Stats"]
    },
    "Web Developer": {
        "required": ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git"],
        "nice_to_have": ["TypeScript", "Next.js", "Tailwind CSS", "REST APIs", "SQL/NoSQL"],
        "categories": ["Frontend", "Backend", "Tools"]
    },
    "Full Stack Developer": {
        "required": ["JavaScript/TypeScript", "React/Angular/Vue", "Node.js/Python/Java", "SQL", "MongoDB/PostgreSQL", "Git", "REST APIs"],
        "nice_to_have": ["Docker", "AWS/Azure", "GraphQL", "CI/CD"],
        "categories": ["Frontend", "Backend", "Database", "DevOps"]
    },
    "Backend Developer": {
        "required": ["Python/Java/Node.js/Go", "SQL", "PostgreSQL/MySQL", "REST APIs", "Git", "System Design"],
        "nice_to_have": ["Docker", "Kubernetes", "Redis", "Kafka", "GraphQL", "AWS/GCP/Azure"],
        "categories": ["Backend", "Database", "Architecture"]
    },
    "Frontend Developer": {
        "required": ["HTML", "CSS", "JavaScript", "React/Vue/Angular", "Responsive Design", "Git"],
        "nice_to_have": ["TypeScript", "Next.js/Nuxt", "Redux/Context API", "Webpack/Vite", "Figma"],
        "categories": ["Frontend", "Design", "Tools"]
    },
    "DevOps Engineer": {
        "required": ["Linux", "Bash/Python", "Docker", "Kubernetes", "CI/CD (Jenkins/GitHub Actions)", "Git", "AWS/Azure/GCP"],
        "nice_to_have": ["Terraform", "Ansible", "Prometheus", "Grafana"],
        "categories": ["Infrastructure", "Automation", "Cloud"]
    },
    "Cloud Architect": {
        "required": ["AWS/Azure/GCP", "System Design", "Networking", "Security", "Infrastructure as Code", "Docker", "Kubernetes"],
        "nice_to_have": ["Serverless", "Microservices", "Cost Optimization"],
        "categories": ["Cloud", "Architecture", "Security"]
    },
    "Mobile Developer": {
        "required": ["Swift/Kotlin/Dart/React Native", "iOS/Android SDK", "REST APIs", "Git", "UI/UX Principles"],
        "nice_to_have": ["Firebase", "SQLite/CoreData", "CI/CD for Mobile", "App Store Deployment"],
        "categories": ["Mobile", "Frontend", "Tools"]
    },
    "Machine Learning Engineer": {
        "required": ["Python", "Machine Learning", "Software Engineering", "Model Deployment", "Docker", "SQL", "Scikit-Learn"],
        "nice_to_have": ["MLOps", "Kubernetes", "TensorFlow/PyTorch", "Spark", "Airflow"],
        "categories": ["AI/ML", "Engineering", "Data"]
    }
}

def get_role_requirements(role_name: str) -> dict:
    """Returns the skill requirements for a given role, or a default if not found."""
    return ROLES_DB.get(role_name, {
        "required": ["Communication", "Problem Solving", "Git"],
        "nice_to_have": [],
        "categories": ["General"]
    })
