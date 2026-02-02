
# Data for the portfolio website

portfolio_data = {
    "name": "Reshekumar V",
    "tagline": "Python Backend Engineer | Cloud-Native | Hardware Enthusiast",
    "about": "I am a passionate software engineer bridgeing the gap between software and hardware. With a strong foundation in backend development and a keen interest in low-level systems, I build scalable, efficient, and robust solutions.",
    "skills": {
        "Backend/Databases": [{"name": "Python", "level": 95}, {"name": "FastAPI", "level": 90}, {"name": "SQL", "level": 85}, {"name": "MongoDB", "level": 80}],
        "DevOps": [{"name": "Docker", "level": 90}, {"name": "Kubernetes", "level": 85}, {"name": "Linux", "level": 88}, {"name": "CI/CD", "level": 82}],
        "Hardware": [{"name": "Arduino", "level": 90}, {"name": "Raspberry Pi", "level": 85}, {"name": "Sensors", "level": 80}],
        "Tools": [{"name": "Git", "level": 95}, {"name": "VS Code", "level": 92}, {"name": "Terminal", "level": 98}]
    },
    "projects": [
        {
            "id": "campity",
            "name": "Campity",
            "type": "Campus Digital Platform",
            "status": "[DEPLOYED]",
            "mission": "Solving urgent daily student problems.",
            "tech_stack": ["Java", "Python Backend", "SQL", "Docker"],
            "description": "Engineered a scalable backend to handle high-concurrency student traffic. Containerized services for consistent deployment across dev and prod envs.",

            "details": {
                "architecture": "Microservices architecture checking in with a central auth service.",
                "features": [
                    "Real-time updates for campus events",
                    "Student marketplace for books and tools",
                    "Secure authentication system"
                ],
                "challenges": "Handling spikes in traffic during exam seasons and ensuring low-latency database queries."
            }
        },
        {
            "id": "optislot",
            "name": "OptiSlot",
            "type": "Smart City Infrastructure / IoT",
            "status": "[DEPLOYED]",
            "mission": "Replacing hardware sensors with AI logic.",
            "tech_stack": ["Kubernetes", "Docker", "Python", "OpenCV"],
            "description": "Architected a 'Gate-Centric' system utilizing Bin-Packing algorithms to optimize parking density. Orchestrated microservices on K8s.",

            "details": {
                "architecture": "Edge-computing setup with cameras processing feeds locally before sending metadata to cloud.",
                "features": [
                    "License plate recognition",
                    "Real-time parking slot availability",
                    "Bin-packing algorithm for optimal space usage"
                ],
                "challenges": "Optimizing OpenCV models to run efficiently on low-power edge devices."
            }
        },
        {
            "id": "automatic-billing",
            "name": "Automatic Billing Backend",
            "type": "Retail Automation / FinTech",
            "status": "[DEPLOYED]",
            "mission": "Streamlining retail operations.",
            "tech_stack": ["Python", "Flask", "Pandas", "REST APIs"],
            "description": "Designed a robust billing engine dealing process-intensive calculation. Ensured data integrity and fast transaction processing.",

            "details": {
                "architecture": "Modular monolith using Pandas DataFrames for high-speed in-memory processing.",
                "features": [
                    "Automated tax calculation",
                    "Inventory sync via CSV/Excel",
                    "PDF Invoice generation"
                ],
                "challenges": "Optimizing DataFrame operations for large transaction volumes without a traditional database."
            }
        }
    ],
    "contact": {
        "linkedin": "https://tinyurl.com/Reshekumar",
        "email": "vrk1711@gmail.com"
    }
}
