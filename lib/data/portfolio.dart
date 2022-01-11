import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';

// Web title
final title = "Kawae's Online Portfolio";
final footer = 'Made with ❤️ by Flutter 2.0';

// Web theme color
// 2020 Gradient - Random
// Color.fromRGBO(229, 163, 35, 1),
// Color.fromRGBO(247, 147, 131, 1),
// 2021 Gradient - OT (Merkel's Folks)
// Color.fromRGBO(6, 188, 251, 1),
// Color.fromRGBO(72, 132, 238, 0.8),
// 2022 Gradient v1 - EATLAB (Salmon with Leonardo)
// Color.fromRGBO(148, 110, 96, 1),
// Color.fromRGBO(208, 128, 111, 0.8),

final theme = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomCenter,
  colors: [
    Color.fromRGBO(148, 110, 96, 1),
    Color.fromRGBO(208, 128, 111, 0.8),
  ],
);

// Web contents
final imgPath = 'assets/icon.png';

final aboutMe = {
  'name': 'Kasidech Chumkun',
  'description':
      '    Aspiring Machine Learning Engineer who worked on both Computer Vision and Natural Language Processing field.'
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
  'Docker Hub': [
    Icon(MaterialCommunityIcons.docker, size: 32, color: Colors.white),
    'https://hub.docker.com/u/kawaekc',
  ],
};

// Education
final education = {
  'name': "King Mongkut's University of Technology Thonburi",
  'icon': 'assets/kmutt.png',
  'description':
      'Bachelor of Science in Computer Science\nSchool of Information Technology\n2016 - 2020',
  'url': null,
};

// Experiences including full time job and internship with full detail
final experiences = [
  {
    'name': 'EATLAB',
    'icon': 'assets/eatlab.png',
    'description': 'Machine Learning Engineer\nSeptember 2021 – Present',
    'url':
        'https://docs.google.com/document/d/1WqTI2qxVPLQRbK1aoOFkFkI-a8hwYRPXGbBOAZ6-eO4/',
  },
  {
    'name': 'Omniscien Technologies',
    'icon': 'assets/omniscien.png',
    'description': 'Machine Learning Engineer\nApril 2020 – September 2021',
    'url':
        'https://docs.google.com/document/d/1zIeFE8VqtcwyNVLpPQtRPhNyWvUSLmCyZ3xer_uDGt0/',
  },
  {
    'name': 'Data Wow Co., Ltd.',
    'icon': 'assets/datawow.png',
    'description': 'Data Science Intern\nJune 2019 – July 2019',
    'url':
        'https://docs.google.com/document/d/1sSDRoUzgJeR0ABg87h4sZkMYJ4Ps_3NS8l5ERhn4T1k/',
  }
];

// All of the projects after this line are optional
final internshipProject = [
  {
    'name': 'Pantip Tag classifier',
    'description':
        'A classifier that can classify 34 types of Pantip tags out of 38 classes which do not include isolate, religion, Korea and mixed room',
    'icon': 'assets/pantip.png',
    'url':
        'https://docs.google.com/document/d/12tATEv_tQ_dBiE3EMYCGJLUJltzcM8QCT3ROBzi8I1A/',
  },
  {
    'name': 'Emoji Search',
    'description':
        'Web platform that allow the moderator to search emoji and convert all of them into different types of Unicode',
    'icon': 'assets/emoji.png',
    'url':
        'https://docs.google.com/document/d/1pGVaSIhBiQtU-OsmSqarybUlkBszKpFpMJ3o3xBZj0M/',
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
    'name': 'Duplicazer',
    'description':
        'Simple web application for remove/find duplicate string from raw text',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/duplicazer',
  },
  {
    'name': 'py-hLEPOR',
    'description': 'Python Bindings to hLEPOR metric',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/py-hLEPOR',
  },
  {
    'name': 'pyGlue',
    'description': 'Simple Python library for dealing with a glued word',
    'icon': 'assets/blank.png',
    'url': 'https://github.com/Kawaeee/pyGlue',
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
