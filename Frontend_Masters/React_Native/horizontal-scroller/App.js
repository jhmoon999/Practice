import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableHighlight,
    Linking
} from 'react-native';
// TODO: separate data as a separate component
const data = [
    // TODO: put images into assets and link them here
    {
        name: "The Drop", 
        imageUrl: "https://www.uokpl.rs/fpng/d/346-3462839_round-profile-image.png"
    },
    {
        name: "personal shopper",
        imageUrl: "https://drjohnroberson.com/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
    },
    {
        name: "prime wardrobe",
        imageUrl: "https://www.shareicon.net/data/512x512/2015/12/01/680803_button_512x512.png"
    },
    {
        name: "Style",
        imageUrl: "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png"
    }
];
/**
 * Component to render each styling service as a horizontal-list item.
 */
export default class StylingServicesCard extends React.Component {
    render() {
        // TODO: Separate header as a separate component
        return (
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text>STYLING SERVICES</Text>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.item}>
                              <TouchableHighlight
                                onPress={() => {
                                  Linking.openURL('https://google.com')
                                }}>
                                <Image
                                    source={{uri: item.imageUrl}}
                                    style={{     
                                      flex: 0.6,
                                      aspectRatio: 0.5,
                                      margin: 40,
                                      resizeMode: 'contain' 
                                    }}
                                />
                              </TouchableHighlight>
                              <Text style={{textAlign: 'center'}}>
                                {item.name}
                              </Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
          </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // TODO: style each item
    item: {
      alignItems: 'center'
    }
});

// import React, { Component } from "react";
// import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
// import { Card } from "react-native-elements";

// const data = [
//   {
//     imageUrl: "http://via.placeholder.com/160x160",
//     title: "something"
//   },
//   {
//     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSG56D0ipdxTB1mo2f0rIXhriLSsJuY7MwrGg&usqp=CAU",
//     title: "something two"
//   },
//   {
//     imageUrl: "http://via.placeholder.com/160x160",
//     title: "something three"
//   },
//   {
//     imageUrl: "http://via.placeholder.com/160x160",
//     title: "something four"
//   },
//   {
//     imageUrl: "http://via.placeholder.com/160x160",
//     title: "something five"
//   },
//   {
//     imageUrl: "http://via.placeholder.com/160x160",
//     title: "something six"
//   }
// ];

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   }
// });

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: data
//     };
//   }

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>
//           STYLING SERVICES
//         </Text>
//         <FlatList
//         horizontal
//         data={this.state.data}
//         renderItem={({ item: rowData }) => {
//           return (
//             <Card
//               title={null}
//               image={{ uri: rowData.imageUrl }}
//               containerStyle={{ padding: 0, width: 160 }}
//             >
//               <Text style={{ marginBottom: 10 }}>
//                 {rowData.title}
//               </Text>
//             </Card>
//           );
//         }}
//         keyExtractor={(item, index) => index}
//       />
//       </SafeAreaView>
//     );
//   }
// }