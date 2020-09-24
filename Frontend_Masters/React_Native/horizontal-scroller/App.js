import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSG56D0ipdxTB1mo2f0rIXhriLSsJuY7MwrGg&usqp=CAU",
    title: "something two"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something three"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something four"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something five"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something six"
  }
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>
          STYLING SERVICES
        </Text>
        <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              title={null}
              image={{ uri: rowData.imageUrl }}
              containerStyle={{ padding: 0, width: 160 }}
            >
              <Text style={{ marginBottom: 10 }}>
                {rowData.title}
              </Text>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
      </SafeAreaView>
    );
  }
}