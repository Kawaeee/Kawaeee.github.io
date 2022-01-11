import 'package:flutter/material.dart';
import 'package:kawae_portfolio/data/portfolio.dart';
import 'package:kawae_portfolio/util/url_navigator.dart';

Widget contactWidget(String value) {
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
