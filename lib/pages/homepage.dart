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
            children: [
              Container(
                decoration: BoxDecoration(
                  gradient: theme,
                ),
              ),
              SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Container(
                  constraints: BoxConstraints(
                    minWidth: constraints.maxWidth,
                    minHeight: constraints.maxHeight,
                  ),
                  child: createPortfolio(screenSize, context),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

// Mobile and Desktop site structures
Widget createPortfolio(Size screenSize, BuildContext context) {
  if (screenSize.width < 750) {
    return IntrinsicHeight(
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
    );
  } else {
    // Large screen size
    return Container(
      child: Align(
        alignment: Alignment.center,
        child: Text(
          "Kawae's portfolio currently support only Mobile site :)",
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
