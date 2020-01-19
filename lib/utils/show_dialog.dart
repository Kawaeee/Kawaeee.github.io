import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/utils/font_config.dart';

void displayExperienceDetail(Size screenSize, BuildContext context) {
  showDialog(
    barrierDismissible: false,
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(30.0))),
        title: Text('Internship at ' + internship['name']),
        content: Container(
          width: screenSize.width - 100,
          height: screenSize.height / 2,
          child: ListView(
            shrinkWrap: true,
            children: <Widget>[
              Column(
                children: <Widget>[
                  Text(
                    internshipDetail['header'],
                    textAlign: TextAlign.justify,
                    style: headerStyle,
                  ),
                  SizedBox(height: 8),
                  Text(
                    internshipDetail['responsibilities_0'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_1'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_2'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_3'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_4'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_5'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_6'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['responsibilities_7'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  SizedBox(height: 8),
                  Text(
                    internshipDetail['sub_header'],
                    textAlign: TextAlign.justify,
                    style: headerStyle,
                  ),
                  SizedBox(height: 5),
                  Text(
                    internshipDetail['main_task'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  Text(
                    internshipDetail['sub_task'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  SizedBox(height: 5),
                  Text(
                    internshipDetail['task_detail'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                  SizedBox(height: 5),
                  Text(
                    internshipDetail['etc'],
                    textAlign: TextAlign.justify,
                    style: contentStyle,
                  ),
                ],
              ),
            ],
          ),
        ),
        actions: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              IconButton(
                tooltip: 'Blog Review',
                icon: Icon(MaterialCommunityIcons.medium,
                    size: 14, color: Colors.white),
                onPressed: () {
                  navigateLink(
                    internshipDetail['review'],
                  );
                },
              ),
              FlatButton(
                child: Text('Done'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        ],
      );
    },
  );
}

void displayInternshipDetail(BuildContext context) {
  showDialog(
    barrierDismissible: false,
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(30.0))),
        title: Text('Coming soon...'),
        actions: <Widget>[
          FlatButton(
            child: Text('Done'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}
