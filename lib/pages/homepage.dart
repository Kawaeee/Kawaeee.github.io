import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kawae_portfolio/contents/portfolio.dart';
import 'package:kawae_portfolio/designs/layout.dart';

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
