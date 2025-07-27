import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ToiletDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { toilet } = route.params;
  console.log('Toilet detail received:', toilet);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: toilet.image ?? 'https://via.placeholder.com/300x200' }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{toilet.name}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.address}>{toilet.address}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={18} color="#FFA500" />
              <Text style={styles.rating}>
                {toilet.rating ? toilet.rating.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <Text style={styles.ratingText}>out of 5</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Facilities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {toilet.type?.includes('male') && (
              <FacilityCard label="Male" icon="male" />
            )}
            {toilet.type?.includes('female') && (
              <FacilityCard label="Female" icon="female" />
            )}
            {toilet.type?.includes('disabled') && (
              <FacilityCard label="Accessible" icon="accessible" />
            )}
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Feedback Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Reviews</Text>
          {toilet.feedback?.length ? (
            <View style={styles.feedbackList}>
              {toilet.feedback.map((f, idx) => (
                <View key={idx} style={styles.feedbackCard}>
                  <View style={styles.feedbackHeader}>
                    <View style={styles.starsContainer}>
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcons
                          key={i}
                          name="star"
                          size={14}
                          color={i < f.rating ? "#FFA500" : "#E0E0E0"}
                        />
                      ))}
                    </View>
                    <Text style={styles.feedbackRating}>{f.rating}/5</Text>
                  </View>
                  <Text style={styles.feedbackComment}>{f.comment}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noFeedbackContainer}>
              <MaterialIcons name="rate-review" size={24} color="#CCC" />
              <Text style={styles.noFeedback}>No reviews yet. Be the first to share your experience!</Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => navigation.navigate('Feedback', { toiletId: toilet.id })}
          activeOpacity={0.8}
        >
          <MaterialIcons name="rate-review" size={20} color="#fff" />
          <Text style={styles.feedbackButtonText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const FacilityCard = ({ label, icon }) => (
  <View style={styles.facilityCard}>
    <View style={styles.facilityIconContainer}>
      <MaterialIcons name={icon} size={24} color="#555" />
    </View>
    <Text style={styles.facilityText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    paddingBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: '#E8E8E8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 25,
    flex: 1,
  },
  header: {
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 8,
    lineHeight: 30,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    fontSize: 15,
    color: '#666',
    marginLeft: 4,
    flex: 1,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F57C00',
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    backgroundColor: '#E8E8E8',
    height: 1,
    marginVertical: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityCard: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  facilityIconContainer: {
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  feedbackList: {
    gap: 12,
  },
  feedbackCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  feedbackRating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  feedbackComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  noFeedbackContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noFeedback: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  feedbackButton: {
    backgroundColor: '#4A4A4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ToiletDetailScreen;