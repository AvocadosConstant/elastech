var adverbs = ["Super", "Truly", "Oddly", "Furiously", "Perhaps", "Very", "Simply", "Sometimes"]; 

var adjectives = ["Big", "Extended", "Half", "Wild", "Calm", "Bharadvaja’s", "British", "Raised", 
                  "Reclining", "Easy", "Four-Limbed", "High", "Adorable", "Magnificient", 
                  "Uneven", "Marichi's", "Melting", "Full", "Flowing", "Heavy", "Gentle", "Little",
                  "Broken", "Lively", "Average", "Brave", "Clumsy", "Swedish", "Graceful", "Side",
                  "Sweaty", "Exhaling", "Unsavory", "Stony", "Biodegradable", "Soggy"];

var nouns = ["Toe", "Frog", "Tiger", "Angle", "Bow", "Cat", "Camel", "Crane", "Puppy", "Baby", "Locust", 
             "Monkey", "Peacock", "Plow", "Mountain", "Thing", "Dog", "Fish", "Firefly", "Log", "Moon",
             "Lotus", "Branch", "Bird", "Warrior", "Child", "Worm", "Twist", "Flower", "Bend", "Tree",
             "Archer", "Boat", "Cobra", "Cow", "Plank", "Bridge", "Triangle", "Lion", "Sphinx", "Lizard",
             "Scorpion", "River", "Potato", "Carrot", "Body", "Mouse", "Chicken", "Pinocchio", 
             "Cinderella", "Beast", "Fox", "Crayfish", "Shrimp", "Finger"];

function generatePoseName() {
   var pose = adjectives[Math.floor(Math.random() * adjectives.length)] + " " +
              nouns[Math.floor(Math.random() * nouns.length)] + " Pose"; 

   // Occasionally include adverb
   if (Math.floor(Math.random() * 2) == 0) {
      pose = adverbs[Math.floor(Math.random() * adverbs.length)] + " " + pose;
   }

   // Set text
   document.getElementById("pose-text").innerHTML = pose;
}
