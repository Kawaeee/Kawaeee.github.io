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
		title: 'AI / ML',
		items: [
			'LLMs',
			'RAG',
			'NLP',
			'Computer Vision',
			'PyTorch',
			'TensorFlow',
			'HuggingFace Transformers',
			'DSPy',
			'LangGraph',
			'fastText'
		]
	},
	{
		title: 'Google Cloud',
		items: ['Vertex AI', 'Cloud Run', 'Cloud Build', 'BigQuery', 'GCS']
	},
	{
		title: 'AWS',
		items: ['SageMaker', 'Lambda', 'EventBridge', 'EC2', 'S3']
	},
	{
		title: 'Platform & Infra',
		items: ['Docker', 'CI/CD', 'Linux', 'Git', 'TensorFlow Serving']
	},
	{
		title: 'Backend & Web',
		items: ['FastAPI', 'Flask', 'Streamlit', 'Next.js', 'Svelte']
	}
];
