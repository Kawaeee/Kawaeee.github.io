// Create own TextStyle
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

TextStyle createFontStyle(double fontSize, FontWeight fontWeight, Color color) {
  return TextStyle(
    fontFamily: 'Montserrat',
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    letterSpacing: 1,
  );
}

// About me
final name = createFontStyle(
  32,
  FontWeight.w600,
  Color.fromRGBO(255, 255, 255, 0.9),
);
final description = createFontStyle(
  15,
  FontWeight.w300,
  Colors.grey[800],
);

// Sections
final sectionHeader = createFontStyle(
  24,
  FontWeight.w600,
  Color.fromRGBO(255, 255, 255, 0.9),
);
final sectionName = createFontStyle(
  16,
  FontWeight.w600,
  Color.fromRGBO(255, 255, 255, 0.8),
);
final sectionDetail = createFontStyle(
  12,
  FontWeight.w400,
  Colors.grey[800],
);
final sectionButton = createFontStyle(
  14,
  FontWeight.w200,
  Color.fromRGBO(255, 255, 255, 0.6),
);

// Footer
final footerStyle = createFontStyle(
  10,
  FontWeight.w100,
  Colors.white70,
);
