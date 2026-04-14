export interface Project {
	id: string;
	name: string;
	description: string;
	icon: string;
	sourceUrl?: string;
	demoUrl?: string;
}

export const projects: Project[] = [
	{
		id: 'yolov8-tfserving',
		name: 'YOLOv8 tf-serving',
		description:
			'Convert YOLOv8 models to TensorFlow Serving format for production deployment.',
		icon: 'images/projects/blank.png',
		sourceUrl: 'https://github.com/Kawaeee/yolov8_tf-serving'
	},
	{
		id: 'corgi-butt-or-loaf',
		name: 'Corgi Butt or Loaf of Bread?',
		description: 'A PyTorch classifier that tells corgi butts from loaves of bread.',
		icon: 'images/projects/butt_or_bread.png',
		sourceUrl: 'https://github.com/Kawaeee/butt_or_bread',
		demoUrl: 'https://bob-or-bread.streamlit.app'
	},
	{
		id: 'scala-ds',
		name: 'Scala DS',
		description: 'Scala programming language for data science — a learning resource.',
		icon: 'images/projects/scala.png',
		sourceUrl: 'https://github.com/Kawaeee/scala_ds',
		demoUrl: 'https://kawaeee.github.io/scala_ds/'
	},
	{
		id: 'istylist',
		name: 'iStylist: Hairstyle Recommender',
		description: 'Mobile app that recommends a hairstyle based on the user’s face shape.',
		icon: 'images/projects/istylist.png',
		demoUrl: 'https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43'
	},
	{
		id: 'py-hlepor',
		name: 'py-hLEPOR',
		description: 'Python bindings to the hLEPOR machine-translation metric.',
		icon: 'images/projects/blank.png',
		sourceUrl: 'https://github.com/Kawaeee/py-hLEPOR'
	},
	{
		id: 'phash',
		name: 'pHash',
		description: 'Image de-duplication using perceptual hashing.',
		icon: 'images/projects/blank.png',
		sourceUrl: 'https://github.com/Kawaeee/phash'
	},
	{
		id: 'more',
		name: 'More on GitHub',
		description: 'Plenty more small projects and experiments live on my GitHub.',
		icon: 'images/projects/blank.png',
		sourceUrl: 'https://github.com/Kawaeee/'
	}
];
