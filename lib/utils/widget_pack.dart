import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_config.dart';

// Including Senior project and all repositories
Widget createRepository(Map map) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: <Widget>[
      Image.asset(
        map['icon'],
        width: 85,
        height: 85,
      ),
      SizedBox(
        width: 10,
      ),
      Expanded(
        child: Column(
          children: <Widget>[
            Text(
              map['name'],
              textAlign: TextAlign.center,
              style: sectionName,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              map['description'],
              textAlign: TextAlign.center,
              style: sectionDetail,
            ),
            SizedBox(
              height: 5,
            ),
            FlatButton(
              child: Text(
                'See Project',
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

Widget createInternship(Map map) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: <Widget>[
      Image.asset(
        map['icon'],
        width: 70,
        height: 70,
      ),
      SizedBox(
        width: 10,
      ),
      Expanded(
        child: Column(
          children: <Widget>[
            Text(
              map['name'],
              textAlign: TextAlign.center,
              style: sectionName,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              map['description'],
              textAlign: TextAlign.center,
              style: sectionDetail,
            ),
            SizedBox(
              height: 5,
            ),
            FlatButton(
              child: Text(
                'More Detail',
                textAlign: TextAlign.center,
                style: sectionDetail,
              ),
              onPressed: () {
                // Dialog with full text
              },
            ),
          ],
        ),
      ),
    ],
  );
}

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
