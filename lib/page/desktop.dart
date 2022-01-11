import 'package:flutter/material.dart';
import 'package:kawae_portfolio/data/portfolio.dart';
import 'package:kawae_portfolio/style/font.dart';
import 'package:kawae_portfolio/component/experience.dart';
import 'package:kawae_portfolio/component/education.dart';
import 'package:kawae_portfolio/component/project.dart';
import 'package:kawae_portfolio/component/contact.dart';

// Desktop site structure
Widget desktopWidget(dynamic constraints) {
  return SingleChildScrollView(
    physics: const AlwaysScrollableScrollPhysics(),
    child: Container(
      constraints: BoxConstraints(
        minWidth: constraints.maxWidth,
        minHeight: constraints.maxHeight,
      ),
      child: IntrinsicHeight(
        child: Stack(
          children: <Widget>[
            Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    // About me
                    Container(
                      width: constraints.maxWidth / 1.1,
                      height: 250,
                      child: Container(
                        margin: EdgeInsets.all(16),
                        padding: EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 16,
                        ),
                        decoration: BoxDecoration(
                          color: Color.fromRGBO(255, 255, 255, 0.4),
                          borderRadius: BorderRadius.all(
                            Radius.circular(30.0),
                          ),
                        ),
                        child: Row(
                          children: <Widget>[
                            Container(
                              // Image
                              child: Image.asset(
                                imgPath,
                                width: 150,
                                height: 150,
                              ),
                            ),
                            SizedBox(width: 15),
                            Expanded(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: <Widget>[
                                  SizedBox(height: 40),
                                  Text(
                                    aboutMe['name'],
                                    textAlign: TextAlign.left,
                                    style: name,
                                  ),
                                  SizedBox(height: 10),
                                  Text(
                                    aboutMe['description'],
                                    textAlign: TextAlign.justify,
                                    style: description,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                // Left section - Education/Experience
                Row(
                  children: <Widget>[
                    Column(
                      children: <Widget>[
                        // Experience
                        Container(
                          width: constraints.maxWidth / 2,
                          height: constraints.maxHeight / 2.5,
                          child: Container(
                            margin: EdgeInsets.only(
                              left: 16,
                              right: 8,
                              bottom: 16,
                            ),
                            padding: EdgeInsets.symmetric(
                              horizontal: 32,
                              vertical: 8,
                            ),
                            decoration: BoxDecoration(
                              color: Color.fromRGBO(255, 255, 255, 0.4),
                              borderRadius: BorderRadius.all(
                                Radius.circular(30.0),
                              ),
                            ),
                            child: ListView(
                              physics: const AlwaysScrollableScrollPhysics(),
                              shrinkWrap: true,
                              children: <Widget>[
                                Column(
                                  children: <Widget>[
                                    SizedBox(height: 10),
                                    Text(
                                      'Experiences',
                                      textAlign: TextAlign.center,
                                      style: sectionHeader,
                                    ),
                                    SizedBox(height: 15),
                                    experienceWidget(
                                        experiences[0], 'Experience'),
                                    SizedBox(height: 10),
                                    experienceWidget(
                                        experiences[1], 'Experience'),
                                    SizedBox(height: 10),
                                    experienceWidget(
                                        experiences[2], 'Internship'),
                                    SizedBox(height: 10),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                        // Education
                        Container(
                          width: constraints.maxWidth / 2,
                          height: constraints.maxHeight / 4,
                          child: Container(
                            margin: EdgeInsets.only(
                              left: 16,
                              right: 8,
                            ),
                            padding: EdgeInsets.symmetric(
                              horizontal: 32,
                              vertical: 8,
                            ),
                            decoration: BoxDecoration(
                              color: Color.fromRGBO(255, 255, 255, 0.4),
                              borderRadius: BorderRadius.all(
                                Radius.circular(30.0),
                              ),
                            ),
                            child: ListView(
                              physics: const AlwaysScrollableScrollPhysics(),
                              shrinkWrap: true,
                              children: <Widget>[
                                Column(
                                  children: <Widget>[
                                    SizedBox(height: 10),
                                    Text(
                                      'Education',
                                      textAlign: TextAlign.center,
                                      style: sectionHeader,
                                    ),
                                    SizedBox(height: 15),
                                    educationWidget(education, 'Education'),
                                    SizedBox(height: 10),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    // Right Section - Projects
                    Container(
                      width: constraints.maxWidth / 2,
                      height: constraints.maxHeight / 1.5,
                      child: Container(
                        margin: EdgeInsets.only(
                          top: 8,
                          left: 8,
                          right: 16,
                          bottom: 8,
                        ),
                        padding: EdgeInsets.symmetric(
                          horizontal: 32,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          color: Color.fromRGBO(255, 255, 255, 0.4),
                          borderRadius: BorderRadius.all(
                            Radius.circular(30.0),
                          ),
                        ),
                        child: ListView(
                          physics: const AlwaysScrollableScrollPhysics(),
                          shrinkWrap: true,
                          children: <Widget>[
                            Column(
                              children: <Widget>[
                                SizedBox(height: 10),
                                Text(
                                  'Senior Project',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 15),
                                projectWidget(repositories[0], 'Project'),
                                SizedBox(height: 10),
                                Text(
                                  'Internship Projects',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 15),
                                projectWidget(
                                    internshipProject[0], 'Internship'),
                                SizedBox(height: 10),
                                projectWidget(
                                    internshipProject[1], 'Internship'),
                                SizedBox(height: 10),
                                Text(
                                  'Repositories',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 15),
                                projectWidget(repositories[1], 'Project'),
                                SizedBox(height: 10),
                                projectWidget(repositories[2], 'Project'),
                                SizedBox(height: 10),
                                projectWidget(repositories[3], 'Project'),
                                SizedBox(height: 10),
                                projectWidget(repositories[4], 'Project'),
                                SizedBox(height: 10),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            // Contacts
            Align(
              alignment: Alignment.topRight,
              child: Container(
                width: 60,
                height: 240,
                margin: EdgeInsets.only(
                  top: 4,
                ),
                decoration: BoxDecoration(
                  color: Color.fromRGBO(255, 255, 255, 0.4),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30.0),
                    bottomLeft: Radius.circular(30.0),
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    contactWidget('Phone'),
                    contactWidget('Email'),
                    contactWidget('GitHub'),
                    contactWidget('Linkedin'),
                    contactWidget('Medium'),
                    contactWidget('Docker Hub'),
                  ],
                ),
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
