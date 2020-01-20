// Create own TextStyle
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

TextStyle createStyle(double fontSize, FontWeight fontWeight, Color color) {
  return TextStyle(
    fontFamily: 'Nunito',
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    letterSpacing: 0.5,
  );
}

// About me
final name = createStyle(32, FontWeight.w600, Colors.white70);
final description = createStyle(15, FontWeight.w300, Colors.grey[800]);
final sectionHeader = createStyle(24, FontWeight.w600, Colors.white70);

// Education
final sectionName = createStyle(14, FontWeight.w600, Colors.grey[800]);
final sectionDetail = createStyle(12, FontWeight.w400, Colors.grey[800]);

// Projects
final headerStyle = createStyle(14, FontWeight.w500, Colors.white);
final contentStyle = createStyle(12, FontWeight.w400, Colors.white);
