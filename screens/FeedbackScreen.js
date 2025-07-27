import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating,AirbnbRating } from 'react-native-ratings';
import { MaterialIcons } from '@expo/vector-icons';

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { toiletId } = route.params;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating);
};

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      Alert.alert('Missing Information', 'Please provide both a rating and comment to help others.');
      return;
    }

    try {
      // Simulate backend call
      console.log('Submitting Feedback:', { toiletId, rating, comment });

      // In actual app, use fetch() or axios.post() to submit to backend
      Alert.alert('Thank you!', 'Your feedback has been submitted and will help other users.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const getRatingColor = () => {
    if (rating === 0) return '#E0E0E0';
    if (rating <= 2) return '#F44336';
    if (rating <= 3) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="rate-review" size={32} color="#666" />
          </View>
          <Text variant='titleLarge' style={styles.title} >Share Your Experience</Text>
          <Text style={styles.subtitle}>
            Your feedback helps others find the best facilities
          </Text>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <View style={styles.ratingContainer}>
             
            <Rating
              type='star'
              ratingCount={5}
              imageSize={60}
              showRating
              onFinishRating={(val) => setRating(val)}
            />
            {rating > 0 && (
              <View style={[styles.ratingBadge, { backgroundColor: getRatingColor() }]}>
                <Text style={styles.ratingLabel}>{ratingLabels[rating]}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Comment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tell us more</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={5}
              placeholder="What did you like or dislike? Any suggestions for improvement?"
              placeholderTextColor="#999"
              value={comment}
              onChangeText={setComment}
              textAlignVertical="top"
            />
            <View style={styles.inputFooter}>
              <Text style={styles.characterCount}>{comment.length}/500</Text>
            </View>
          </View>
        </View>

        {/* Quick Feedback Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick feedback</Text>
          <View style={styles.quickOptions}>
            {['Clean', 'Well-maintained', 'Good location', 'Accessible'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.quickOption}
                onPress={() => {
                  const newComment = comment ? `${comment} ${option}.` : `${option}.`;
                  setComment(newComment);
                }}
              >
                <Text style={styles.quickOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || !comment.trim()) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={rating === 0 || !comment.trim()}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name="send" 
            size={20} 
            color={(rating === 0 || !comment.trim()) ? '#999' : '#fff'} 
          />
          <Text style={[
            styles.submitButtonText,
            (rating === 0 || !comment.trim()) && styles.submitButtonTextDisabled
          ]}>
            Submit Review
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed button
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
  },
ratingContainer: {
  alignItems: 'center',
  justifyContent: 'center',
}, 
  starsContainer: {
    paddingVertical: 10,
    color: '#2C2C2C',
  },
 ratingBadge: {
  marginTop: 16,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#4CAF50', // default fallback color
  alignItems: 'center',
  justifyContent: 'center',
},  
 ratingLabel: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},

  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    maxHeight: 160,
  },
  inputFooter: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'flex-end',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
  },
  quickOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickOption: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickOptionText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  submitButton: {
    backgroundColor: '#4A4A4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
});

export default FeedbackScreen;