import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/display_dialog.dart';
import 'package:kawae_portfolio/utils/font_configuration.dart';

// Widget Structure for Projects, Internship sections
Widget createProject(Map map, String type, BuildContext context) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: <Widget>[
      Image.asset(
        map['icon'],
        width: 85,
        height: 85,
      ),
      SizedBox(width: 10),
      Expanded(
        child: Column(
          children: <Widget>[
            Text(
              map['name'],
              textAlign: TextAlign.center,
              style: sectionName,
            ),
            SizedBox(height: 10),
            Text(
              map['description'],
              textAlign: TextAlign.center,
              style: sectionDetail,
            ),
            SizedBox(height: 5),
            FlatButton(
              child: Text(
                type == 'Internship' ? 'More Detail' : 'See Project',
                textAlign: TextAlign.center,
                style: sectionDetail,
              ),
              onPressed: () {
                navigateLink(map['url']);
              },
            ),
          ],
        ),
      ),
    ],
  );
}

// Widget Structure for Contacts sections
Widget createContact(String value) {
  return Expanded(
    child: IconButton(
      icon: contacts[value][0],
      tooltip: value,
      onPressed: () {
        navigateLink(contacts[value][1]);
      },
    ),
  );
}

Widget createEducation() {
  return Row(
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
  );
}

Widget createInternship(Size screenSize, BuildContext context) {
  return Row(
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
                displayExperienceDetail(screenSize, context);
              },
            ),
          ],
        ),
      ),
    ],
  );
}
