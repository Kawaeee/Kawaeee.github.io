import 'package:flutter/material.dart';
import 'package:kawae_portfolio/data/portfolio.dart';
import 'package:kawae_portfolio/style/font.dart';
import 'package:kawae_portfolio/component/experience.dart';
import 'package:kawae_portfolio/component/education.dart';
import 'package:kawae_portfolio/component/project.dart';
import 'package:kawae_portfolio/component/contact.dart';

// Mobile site structure
Widget mobileWidget(dynamic constraints) {
  return SingleChildScrollView(
    physics: const AlwaysScrollableScrollPhysics(),
    child: Container(
      child: IntrinsicHeight(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            // About me
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: 64,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  // Image
                  Container(
                    margin: EdgeInsets.only(top: 32),
                    child: Image.asset(
                      imgPath,
                      width: 150,
                      height: 150,
                    ),
                  ),
                  SizedBox(height: 20),
                  Text(
                    aboutMe['name'],
                    textAlign: TextAlign.center,
                    style: name,
                    softWrap: true,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 3,
                  ),
                  SizedBox(height: 8),
                  Text(
                    aboutMe['description'],
                    textAlign: TextAlign.justify,
                    style: description,
                    softWrap: true,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 5,
                  ),
                  SizedBox(height: 10),
                  // Contacts
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      contactWidget('Phone'),
                      contactWidget('Email'),
                      contactWidget('GitHub'),
                      contactWidget('Linkedin'),
                      contactWidget('Medium'),
                      contactWidget('Docker Hub'),
                    ],
                  ),
                  SizedBox(height: 15),
                  // Experiences
                  Text(
                    'Experience',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 15),
                  experienceWidget(experiences[0], 'Experience'),
                  SizedBox(height: 10),
                  experienceWidget(experiences[1], 'Experience'),
                  SizedBox(height: 10),
                  experienceWidget(experiences[2], 'Internship'),
                  // Education
                  Text(
                    'Education',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 15),
                  educationWidget(education, 'Education'),
                  SizedBox(height: 10),
                  // Project
                  Text(
                    'Senior Project',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  projectWidget(repositories[0], 'Project'),
                  SizedBox(height: 15),
                  Text(
                    'Internship Projects',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  projectWidget(internshipProject[0], 'Internship'),
                  SizedBox(height: 5),
                  projectWidget(internshipProject[1], 'Internship'),
                  SizedBox(height: 10),
                  Text(
                    'Repositories',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 15),
                  projectWidget(repositories[1], 'Project'),
                  SizedBox(height: 5),
                  projectWidget(repositories[2], 'Project'),
                  SizedBox(height: 5),
                  projectWidget(repositories[3], 'Project'),
                  SizedBox(height: 5),
                  projectWidget(repositories[4], 'Project'),
                  SizedBox(height: 10),
                ],
              ),
            ),
            // Footer
            Align(
              alignment: Alignment.bottomCenter,
              child: Text(
                footer,
                style: footerStyle,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
