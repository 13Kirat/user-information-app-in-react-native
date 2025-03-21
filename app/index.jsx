import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const API_URL = "https://random-data-api.com/api/users/random_user?size=80";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [loading]); // Run only once on mount

  const fetchUsers = async () => {
    try {
      // console.log("called")
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#000"
        style={styles.loader}
      />
    );

  if (error)
    return (
      <>
        <Text style={styles.error}>{error}</Text>
        <Button
          title="Refresh"
          onPress={fetchUsers}
          color="#444"
        />
      </>
    );

  const currentUser = users[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + 1, users.length - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return newIndex;
    });
  };

  return currentUser ? (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      ref={scrollViewRef}
    >
      <View style={styles.container}>
        {/* Profile Image */}
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
        <Text style={styles.name}>
          {currentUser.first_name} {currentUser.last_name}
        </Text>

        {/* User Data Fields */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionHeader}>User Details</Text>
          {renderField("ID", currentUser.id)}
          {renderField("UID", currentUser.uid)}
          {renderField("Username", currentUser.username)}
          {renderField("Email", currentUser.email)}
          {/* {renderField("Gender", currentUser.gender)} */}
          {/* {renderField("Date of Birth", currentUser.date_of_birth)} */}
          {/* {renderField("Phone Number", currentUser.phone_number)} */}
          {/* {renderField("Social Insurance Number", currentUser.social_insurance_number)} */}
          {renderField("Password", currentUser.password, true)}
          {/* {renderField("Credit Card Number", currentUser.credit_card.cc_number, true)} */}

          {/* Employment Details */}
          {/* <Text style={styles.sectionHeader}>Employment</Text>
          {renderField("Job Title", currentUser.employment.title)}
          {renderField("Key Skill", currentUser.employment.key_skill)} */}

          {/* Subscription Details */}
          {/* <Text style={styles.sectionHeader}>Subscription</Text>
          {renderField("Plan", currentUser.subscription.plan)}
          {renderField("Payment Method", currentUser.subscription.payment_method)}
          {renderField("Status", currentUser.subscription.status)}
          {renderField("Term", currentUser.subscription.term)} */}

          {/* Address Details */}
          {/* <Text style={styles.sectionHeader}>Address</Text>
          {renderField("Street", currentUser.address.street_address)}
          {renderField("Street Name", currentUser.address.street_name)}
          {renderField("City", currentUser.address.city)}
          {renderField("State", currentUser.address.state)}
          {renderField("Country", currentUser.address.country)}
          {renderField("Zip Code", currentUser.address.zip_code)} */}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            color="#444"
          />
          <Text>
            {currentIndex+1}
          </Text>
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentIndex === users.length - 1}
            color="#444"
          />
        </View>
      </View>
    </ScrollView>
  ) : (
    // Fallback view if currentUser is not available
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Unable to fetch details</Text>
      {/* <TouchableOpacity onPress={fetchUsers}>
        <Text style={styles.refresh}>Refresh</Text>
      </TouchableOpacity> */}
      <Button
        title="Refresh"
        onPress={fetchUsers}
        color="#444"
      />
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          color="#444"
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentIndex === users.length - 1}
          color="#444"
        />
      </View> */}
    </View>
  );
}

// Function to render a labeled field
const renderField = (label, value, isSensitive = false) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={isSensitive ? "****************" : value?.toString()}
      editable={false}
      secureTextEntry={isSensitive}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",

  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10
  },
});
