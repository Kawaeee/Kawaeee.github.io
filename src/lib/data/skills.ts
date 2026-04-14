export interface SkillGroup {
	title: string;
	items: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        title: 'Languages',
        items: ['Python', 'TypeScript', 'SQL', 'Bash', 'Scala']
    },
    {
        title: 'AI & Data Science',
        items: [
            'Generative AI (LLMs, RAG)', 
            'NLP', 
            'Computer Vision', 
            'PyTorch', 
            'TensorFlow', 
            'Hugging Face',
            'LangGraph', 
            'DSPy'
        ]
    },
    {
        title: 'MLOps & Data Engineering',
        items: [
            'Data Pipelines', 
            'CI/CD Workflows', 
            'Docker', 
            'TensorFlow Serving', 
            'Model Monitoring'
        ]
    },
    {
        title: 'Cloud Computing',
        items: [
            'Google Cloud (Vertex AI, Cloud Run, BigQuery)', 
            'AWS (SageMaker, Lambda, EC2, EventBridge)'
        ]
    },
    {
        title: 'Backend & Web',
        items: ['FastAPI', 'Flask', 'Streamlit', 'Next.js', 'Svelte']
    }
];