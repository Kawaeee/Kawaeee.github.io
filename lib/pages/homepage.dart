import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_configuration.dart';
import 'package:kawae_portfolio/utils/widget_wrapper.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return Scaffold(
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Stack(
            children: <Widget>[
              Container(
                decoration: BoxDecoration(
                  gradient: theme,
                ),
              ),
              screenSize.width < 850
                  ? createMobilePortfolio(constraints)
                  : createDesktopPortfolio(constraints),
            ],
          );
        },
      ),
    );
  }
}

// Mobile site structure
Widget createMobilePortfolio(dynamic constraints) {
  return SingleChildScrollView(
    physics: const AlwaysScrollableScrollPhysics(),
    child: Container(
      constraints: BoxConstraints(
        minWidth: constraints.maxWidth,
        minHeight: constraints.maxHeight,
      ),
      child: IntrinsicHeight(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            // About me
            Container(
              padding: EdgeInsets.symmetric(horizontal: 64),
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
                  createSection(education, 'Education'),
                  SizedBox(height: 10),
                  // Internship
                  Text(
                    'Experience',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createSection(internship, 'Internship'),
                  SizedBox(height: 10),
                  // Project
                  Text(
                    'Senior Project',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createSection(repositories[0], 'Project'),
                  SizedBox(height: 10),
                  Text(
                    'Internship Projects',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createSection(internshipProject[0], 'Internship'),
                  SizedBox(height: 5),
                  createSection(internshipProject[1], 'Internship'),
                  SizedBox(height: 10),
                  Text(
                    'Repositories',
                    textAlign: TextAlign.center,
                    style: sectionHeader,
                  ),
                  SizedBox(height: 10),
                  createSection(repositories[1], 'Project'),
                  SizedBox(height: 5),
                  createSection(repositories[2], 'Project'),
                  SizedBox(height: 5),
                  createSection(repositories[3], 'Project'),
                  SizedBox(height: 5),
                  createSection(repositories[4], 'Project'),
                  SizedBox(height: 10),
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
    ),
  );
}

// Desktop site structure
Widget createDesktopPortfolio(dynamic constraints) {
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
                    Container(
                      width: constraints.maxWidth / 1.1,
                      height: 250,
                      child: Container(
                        margin: EdgeInsets.all(16),
                        padding:
                            EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        decoration: BoxDecoration(
                          color: Color.fromRGBO(255, 255, 255, 0.4),
                          borderRadius: BorderRadius.all(Radius.circular(30.0)),
                        ),
                        child: Row(
                          children: <Widget>[
                            Container(
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
                Row(
                  children: <Widget>[
                    Column(
                      children: <Widget>[
                        Container(
                          width: constraints.maxWidth / 2,
                          height: constraints.maxHeight / 3,
                          child: Container(
                            margin:
                                EdgeInsets.only(left: 16, right: 8, bottom: 16),
                            padding: EdgeInsets.symmetric(
                                horizontal: 32, vertical: 8),
                            decoration: BoxDecoration(
                              color: Color.fromRGBO(255, 255, 255, 0.4),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30.0)),
                            ),
                            child: Column(
                              children: <Widget>[
                                SizedBox(height: 10),
                                Text(
                                  'Education',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 10),
                                createSection(education, 'Education'),
                                SizedBox(height: 10),
                              ],
                            ),
                          ),
                        ),
                        Container(
                          width: constraints.maxWidth / 2,
                          height: constraints.maxHeight / 3,
                          child: Container(
                            margin:
                                EdgeInsets.only(left: 16, right: 8, bottom: 32),
                            padding: EdgeInsets.symmetric(
                                horizontal: 32, vertical: 8),
                            decoration: BoxDecoration(
                              color: Color.fromRGBO(255, 255, 255, 0.4),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30.0)),
                            ),
                            child: ListView(
                              physics: const AlwaysScrollableScrollPhysics(),
                              shrinkWrap: true,
                              children: <Widget>[
                                Column(
                                  children: <Widget>[
                                    SizedBox(height: 10),
                                    Text(
                                      'Experience',
                                      textAlign: TextAlign.center,
                                      style: sectionHeader,
                                    ),
                                    SizedBox(height: 10),
                                    createSection(internship, 'Internship'),
                                    SizedBox(height: 10),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    Container(
                      width: constraints.maxWidth / 2,
                      height: constraints.maxHeight / 1.5,
                      child: Container(
                        margin: EdgeInsets.only(left: 8, right: 16, bottom: 32),
                        padding:
                            EdgeInsets.symmetric(horizontal: 32, vertical: 8),
                        decoration: BoxDecoration(
                          color: Color.fromRGBO(255, 255, 255, 0.4),
                          borderRadius: BorderRadius.all(Radius.circular(30.0)),
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
                                SizedBox(height: 10),
                                createSection(repositories[0], 'Project'),
                                SizedBox(height: 10),
                                Text(
                                  'Internship Projects',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 10),
                                createSection(
                                    internshipProject[0], 'Internship'),
                                SizedBox(height: 10),
                                createSection(
                                    internshipProject[1], 'Internship'),
                                SizedBox(height: 10),
                                Text(
                                  'Repositories',
                                  textAlign: TextAlign.center,
                                  style: sectionHeader,
                                ),
                                SizedBox(height: 10),
                                createSection(repositories[1], 'Project'),
                                SizedBox(height: 10),
                                createSection(repositories[2], 'Project'),
                                SizedBox(height: 10),
                                createSection(repositories[3], 'Project'),
                                SizedBox(height: 10),
                                createSection(repositories[4], 'Project'),
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
            Align(
              alignment: Alignment.topRight,
              child: Container(
                width: 50,
                height: 225,
                margin: EdgeInsets.only(top: 16),
                decoration: BoxDecoration(
                  color: Color.fromRGBO(255, 255, 255, 0.4),
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30.0),
                      bottomLeft: Radius.circular(30.0)),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    createContact('Phone'),
                    createContact('Email'),
                    createContact('GitHub'),
                    createContact('Linkedin'),
                    createContact('Medium'),
                  ],
                ),
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
    ),
  );
}
