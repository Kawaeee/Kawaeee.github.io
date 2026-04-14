export interface Experience {
	id: string;
	role: string;
	company: string;
	employmentType?: string;
	location?: string;
	duration: string;
	details: string[];
	icon: string;
	current?: boolean;
}

export const experiences: Experience[] = [
	{
		id: 'osotspa',
		role: 'Data Scientist',
		company: 'Osotspa Public Company Limited',
		employmentType: 'Full-time',
		location: 'Bangkok, Thailand · Hybrid',
		duration: 'July 2022 – Present',
		icon: 'images/experiences/osotspa.png',
		current: true,
		details: [
			"Architected and deployed the company's internal AI platform and LLM gateway, managing API routing, model monitoring, and enterprise access.",
			"Launched a RAG system for company authority documents as the AI platform's first production application.",
			'Shipped an LLM-powered OCR system for the M-Point CRM LINE app to automate bottle-cap code recognition.',
			'Built automated data pipelines and CI/CD workflows with Vertex AI, Cloud Run, and Cloud Build.',
			'Led the internal Search Trend dashboard from proof-of-concept through production launch.'
		]
	},
	{
		id: 'hedgehoglet',
		role: 'Founder',
		company: 'Hedgehoglet',
		employmentType: 'Part-time',
		duration: 'July 2022 – Present',
		icon: 'images/experiences/hedgehoglet.png',
		current: true,
		details: [
			'Open-source Thai NLP datasets on GitHub (geographic data, GPU specs) for community research and prototyping.',
			'Publish technical guides on Medium — topics include CUDA-enabled Docker on WSL2 and local LLM orchestration.'
		]
	},
	{
		id: 'eatlab',
		role: 'AI/ML Engineer',
		company: 'EATLAB',
		employmentType: 'Full-time',
		location: 'Bangkok, Thailand · Hybrid',
		duration: 'September 2021 – June 2022',
		icon: 'images/experiences/eatlab.png',
		details: [
			'Built an end-to-end computer-vision pipeline for visitor tracking (Customer360), orchestrating detection and tracking models on AWS SageMaker, Lambda, and EventBridge.',
			'Deployed a multilingual transformer for zero-shot food classification as a serverless AWS Lambda endpoint.',
			'Mentored a junior AI Engineer on project delivery and engineering best practices.'
		]
	},
	{
		id: 'omniscien',
		role: 'Machine Learning Engineer',
		company: 'Omniscien Technologies',
		employmentType: 'Full-time',
		location: 'Bangkok, Thailand · On-site',
		duration: 'Apr 2020 – Sep 2021',
		icon: 'images/experiences/omniscien.png',
		details: [
			'Built a data pipeline from scratch that ingested terabytes of raw web-crawl (WARC) data and converted it into tens of millions of high-quality parallel sentence pairs for MT models.',
			'Contributed to the ParaCrawl Synthesized Data release 2 — domain-specific parallel corpora for Financial, IT, Law, and Medical translation (EU-funded, open source).',
			'Engineered an automated back-translation system on EC2 Spot instances, cutting compute costs by 70%+ vs. on-demand.'
		]
	},
	{
		id: 'datawow',
		role: 'Data Scientist',
		company: 'Data Wow Co., Ltd.',
		employmentType: 'Internship',
		location: 'Bangkok, Thailand · On-site',
		duration: 'June 2019 – July 2019',
		icon: 'images/experiences/datawow.png',
		details: [
			'Benchmarked multiple NLP approaches (BoW, Multinomial NB, LinearSVC, fastText, thai2fit) to establish baseline text classification for Pantip forum tags.',
			'Built a full-stack emoji search engine from scratch — scrapers, MongoDB, Flask web app — indexing the full Unicode emoji catalog.'
		]
	},
	{
		id: 'kmutt',
		role: 'Computer Science Student',
		company: "SIT, King Mongkut's University of Technology Thonburi",
		duration: 'June 2016 – January 2020',
		icon: 'images/experiences/kmutt.png',
		details: [
			'Built iStylist — a hairstyle recommender mobile app.',
			'Rock-Paper-Scissors hand-gesture classification with Keras.',
			'Fake-Starbucks website with PHP + MySQL.'
		]
	}
];
