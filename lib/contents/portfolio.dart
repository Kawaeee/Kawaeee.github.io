import 'dart:html' as html;
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';

void navigateLink(String url) {
  html.window.open(url, '_blank');
}

// Web Title
final title = "Kawae's Online Portfolio";
final footer = 'Made with love by Flutter';

// Web Theme Color

final theme = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [
    Color.fromRGBO(21, 65, 168, 1),
    Color.fromRGBO(145, 234, 228, 1),
  ],
);

// Web Contents
final imgPath = 'assets/icon.png';

final aboutMe = {
  'name': 'Kasidech Chumkun',
  'description':
      '    Adaptive, imaginative, and positive student, who has self-inspiration to develop a Machine Learning model for daily life. Also, interested in pursuing a career related to Data Science and the Artificial Intelligence field.'
};

// Contacts
final contacts = {
  'Phone': [
    Icon(MaterialCommunityIcons.phone, size: 30, color: Colors.white),
    'tel:+66848519908'
  ],
  'Email': [
    Icon(MaterialCommunityIcons.email, size: 32, color: Colors.white),
    'mailto:kawaekc@gmail.com',
  ],
  'GitHub': [
    Icon(MaterialCommunityIcons.github_circle, size: 32, color: Colors.white),
    'https://github.com/Kawaeee',
  ],
  'Linkedin': [
    Icon(MaterialCommunityIcons.linkedin_box, size: 32, color: Colors.white),
    'https://www.linkedin.com/in/kasidech-kaw/',
  ],
  'Medium': [
    Icon(MaterialCommunityIcons.medium, size: 32, color: Colors.white),
    'https://medium.com/@kawaekc',
  ],
};

// Education
final education = {
  'name': "King Mongkut's University of Technology Thonburi",
  'icon': 'assets/kmutt.png',
  'degree': 'Bachelor of Science in Computer Science',
  'faculty': 'School of Information Technology',
  'description': 'Expected Graduation in November 2020',
};

// Internship with full detail
final internship = {
  'name': 'Data Wow Co., Ltd.',
  'icon': 'assets/datawow.png',
  'role': 'Data Science Intern',
  'duration': 'June 2019 – July 2019',
};

final internshipDetail = {
  'header':
      '    My tasks and assignment during this internship have defined as the Data Scientist role. My responsibilities can be described as follows:',
  'responsibilities_0':
      '- Build state-of-the-art Deep Learning models to tackle Computer Vision and NLP problems',
  'responsibilities_1':
      '- Work on data preprocessing in both Image and Text forms',
  'responsibilities_2':
      '- Scraping data from the website and apply in a proper useful format',
  'responsibilities_3':
      '- Train an NLP model with many approaches and benchmarking it',
  'responsibilities_4':
      '- Design use case scenarios to other company for a data recommendation',
  'responsibilities_5':
      '- Write documentation to reproduce work to other colleagues who want to continue work on it',
  'responsibilities_6':
      '- Create a web platform that can apply deep learning model as the predictor',
  'responsibilities_7':
      '- Use data science version control to control binary file such as model',
  'sub_header': 'Tasks & Assignments',
  'main_task': 'Pantip tag classifier',
  'sub_task': 'Emoji Search',
  'task_detail':
      '* You can read more about these projects in the section below.',
  'etc':
      '    Moreover, I already write an internship review that you can read it down here.',
  'review': 'https://blog.datawow.io/intern-review-at-datawow-2019-5689c1e16de',
};

final skills = [];

// All of the projects after this line are optional
final internshipProject = [
  {
    'name': 'Pantip Tag classifier',
    'description':
        'A classifier that can classify 34 types of Pantip tags out of 38 classes which do not include isolate, religion, Korea and mixed room',
    'icon': 'assets/pantip.png',
    'url': 'https://docs.google.com/document/d/12tATEv_tQ_dBiE3EMYCGJLUJltzcM8QCT3ROBzi8I1A/',
  },
  {
    'name': 'Emoji Search',
    'description':
        'Web platform that allow the moderator to search emoji and convert all of them into different types of Unicode',
    'icon': 'assets/emoji.png',
    'url': 'https://docs.google.com/document/d/1pGVaSIhBiQtU-OsmSqarybUlkBszKpFpMJ3o3xBZj0M/',
  }
];

final repositories = [
  {
    'name': 'iStylist: Hairstyle Recommender',
    'description':
        "The mobile application that helps the user to choose a hairstyle based on the user's face shape",
    'icon': 'assets/istylist.png',
    'url': 'https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43',
  },
  {
    'name': 'Corgi butt or a loaf of bread?',
    'description':
        'A classifier that can classify between corgi butt and loaf of bread using PyTorch',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/butt_or_bread',
  },
  {
    'name': 'Rock-Paper-Scissors Classifier',
    'description':
        'Rock-Paper-Scissors hand gestures classification using Keras',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/RPS_classification',
  },
  {
    'name': 'faceCrop',
    'description': 'Simple face cropper using Haar Cascade classifier',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/faceCrop',
  },
  {
    'name': 'Medical Form OCR',
    'description':
        'Simple medical form management platform using Flask+pytesseract',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/medical_forms_ocr',
  },
  {
    'name': 'Morse Translator',
    'description':
        'Python-based project that decodes Morse code into text and encodes text into Morse code',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/NotBattleFrog/morsetranslator',
  },
  {
    'name': 'Instadroid',
    'description': 'Simple Instagram post scheduler based on Python',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/Instadroid',
  },
  {
    'name': 'TwitterSearcher',
    'description': 'Twitter search engine application using Twitter4J',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/TwitterSearcher',
  },
];
