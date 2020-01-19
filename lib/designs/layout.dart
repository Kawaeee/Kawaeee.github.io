import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_config.dart';
import 'package:kawae_portfolio/utils/show_dialog.dart';
import 'package:kawae_portfolio/utils/widget_pack.dart';

Widget createPortfolio(Size screenSize, BuildContext context) {
  if (screenSize.width < 750) {
    return SingleChildScrollView(
      child: Expanded(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
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
            // About me
            Container(
              padding: EdgeInsets.symmetric(horizontal: 64),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(
                    aboutMe['name'],
                    textAlign: TextAlign.center,
                    style: name,
                  ),
                  SizedBox(height: 8),
                  Text(
                    aboutMe['description'],
                    textAlign: TextAlign.justify,
                    style: description,
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      createContact('Phone'),
                      createContact('Email'),
                      createContact('GitHub'),
                      createContact('Linkedin'),
                      createContact('Medium'),
                    ],
                  ),
                  SizedBox(height: 10),
                  // Education
                  Text(
                    'Education',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      Image.asset(
                        education['icon'],
                        width: 85,
                        height: 85,
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          children: <Widget>[
                            Text(
                              education['name'],
                              textAlign: TextAlign.center,
                              style: sectionName,
                            ),
                            SizedBox(height: 10),
                            Text(
                              education['degree'],
                              textAlign: TextAlign.center,
                              style: sectionDetail,
                            ),
                            SizedBox(height: 5),
                            Text(
                              education['faculty'],
                              textAlign: TextAlign.center,
                              style: sectionDetail,
                            ),
                            SizedBox(height: 5),
                            Text(
                              education['description'],
                              textAlign: TextAlign.center,
                              style: sectionDetail,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  // Internship
                  Text(
                    'Experience',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      Image.asset(
                        internship['icon'],
                        width: 85,
                        height: 85,
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          children: <Widget>[
                            Text(
                              internship['name'],
                              textAlign: TextAlign.center,
                              style: sectionName,
                            ),
                            SizedBox(height: 10),
                            Text(
                              internship['role'],
                              textAlign: TextAlign.center,
                              style: sectionDetail,
                            ),
                            SizedBox(height: 5),
                            Text(
                              internship['duration'],
                              textAlign: TextAlign.center,
                              style: sectionDetail,
                            ),
                            SizedBox(height: 5),
                            FlatButton(
                                child: Text(
                                  'More Detail',
                                  textAlign: TextAlign.center,
                                  style: sectionDetail,
                                ),
                                onPressed: () {
                                  showInternshipDetail(screenSize, context);
                                }),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  // Project
                  Text(
                    'Senior Project',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createProject(repositories[0], null),
                  SizedBox(height: 10),
                  Text(
                    'Internship Projects',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createProject(internshipProject[0], 'Internship'),
                  SizedBox(height: 5),
                  createProject(internshipProject[1], 'Internship'),
                  SizedBox(height: 10),
                  // Text(
                  //   'Repositories',
                  //   textAlign: TextAlign.center,
                  //   style: sectionHeader,
                  // ),
                  // SizedBox(height: 10),
                  // createProject(repositories[1],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[2],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[3],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[4],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[5],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[6],null),
                  // SizedBox(height: 5),
                  // createProject(repositories[7],null),
                  // SizedBox(height: 10),
                ],
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Text(
                footer,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w100,
                  color: Colors.white70,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  } else {
    // Large screen size
    return Container(
      child: Align(
        alignment: Alignment.center,
        child: Text(
          "Kawae's portfolio will coming to Desktop site soon...",
          style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.w100,
            color: Colors.white70,
          ),
        ),
      ),
    );
  }
}
