// Create own TextStyle
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

TextStyle createStyle(double fontSize, FontWeight fontWeight, Color color) {
  return TextStyle(
    fontFamily: 'Nunito',
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    letterSpacing: 1,
  );
}

// About me
final name =
    createStyle(32, FontWeight.w600, Color.fromRGBO(255, 255, 255, 0.9));
final description = createStyle(15, FontWeight.w300, Colors.grey[800]);

// Sections
final sectionHeader =
    createStyle(24, FontWeight.w600, Color.fromRGBO(255, 255, 255, 0.8));
final sectionName = createStyle(16, FontWeight.w600, Colors.grey[800]);
final sectionDetail = createStyle(12, FontWeight.w400, Colors.grey[800]);
final sectionButton =
    createStyle(14, FontWeight.w200, Color.fromRGBO(255, 255, 255, 0.7));
