import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_config.dart';
import 'package:kawae_portfolio/utils/show_dialog.dart';
import 'package:kawae_portfolio/utils/widget_pack.dart';

Widget createPortfolio(String size, Size screenSize, BuildContext context) {
  if (size == 'S') {
    // Small screen size (<580)
    return Container(
      width: screenSize.width,
      height: screenSize.height,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        shrinkWrap: true,
        children: <Widget>[
          Column(
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
                        IconButton(
                          icon: contacts['Phone'][0],
                          tooltip: 'Phone',
                          onPressed: () {
                            navigateLink(contacts['Phone'][1]);
                          },
                        ),
                        IconButton(
                          icon: contacts['Email'][0],
                          tooltip: 'Email',
                          onPressed: () {
                            navigateLink(contacts['Email'][1]);
                          },
                        ),
                        IconButton(
                          icon: contacts['GitHub'][0],
                          tooltip: 'GitHub',
                          onPressed: () {
                            navigateLink(contacts['GitHub'][1]);
                          },
                        ),
                        IconButton(
                          icon: contacts['Linkedin'][0],
                          tooltip: 'Linkedin',
                          onPressed: () {
                            navigateLink(contacts['Linkedin'][1]);
                          },
                        ),
                        IconButton(
                          icon: contacts['Medium'][0],
                          tooltip: 'Medium',
                          onPressed: () {
                            navigateLink(contacts['Medium'][1]);
                          },
                        ),
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
                    // // Project
                    // Text(
                    //   'Senior Project',
                    //   textAlign: TextAlign.center,
                    //   style: sectionHeader,
                    // ),
                    // SizedBox(height: 10),
                    // createRepository(repositories[0]),
                    // SizedBox(height: 10),
                    // Text(
                    //   'Internship Projects',
                    //   textAlign: TextAlign.center,
                    //   style: sectionHeader,
                    // ),
                    // SizedBox(height: 10),
                    // createInternship(internshipProject[0]),
                    // SizedBox(height: 5),
                    // createInternship(internshipProject[1]),
                    // SizedBox(height: 10),
                    // Text(
                    //   'Repositories',
                    //   textAlign: TextAlign.center,
                    //   style: sectionHeader,
                    // ),
                    // SizedBox(height: 10),
                    // createRepository(repositories[1]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[2]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[3]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[4]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[5]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[6]),
                    // SizedBox(height: 5),
                    // createRepository(repositories[7]),
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
        ],
      ),
    );
  } else if (size == 'L') {
    // Large screen size (>580)
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

  return Container();
}
