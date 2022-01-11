import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kawae_portfolio/data/portfolio.dart';
import 'package:kawae_portfolio/page/desktop.dart';
import 'package:kawae_portfolio/page/mobile.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Prefer - Portrait UP orientation
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
      .then((value) => runApp(App()));
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: title,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Montserrat',
        brightness: Brightness.dark,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final Orientation orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Stack(
            children: <Widget>[
              Container(
                decoration: BoxDecoration(
                  gradient: theme,
                ),
              ),
              orientation == Orientation.portrait
                  ? mobileWidget(constraints)
                  : orientation == Orientation.landscape &&
                          screenSize.shortestSide < 600
                      ? mobileWidget(constraints)
                      : desktopWidget(constraints)
            ],
          );
        },
      ),
    );
  }
}
