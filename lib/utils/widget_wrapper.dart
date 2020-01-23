import 'dart:html' as html;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_configuration.dart';

void navigateLink(String url) {
  html.window.open(url, '_blank');
}

// Widget structure for Projects, Internship sections
Widget createSection(Map map, String type) {
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
            map['url'] != null
                ? FlatButton(
                    child: Text(
                      type == 'Internship' ? 'More Detail' : 'See Project',
                      textAlign: TextAlign.center,
                      style: sectionButton,
                    ),
                    onPressed: () {
                      navigateLink(map['url']);
                    },
                  )
                : Container(),
          ],
        ),
      ),
    ],
  );
}

// Widget structure for Contacts sections
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