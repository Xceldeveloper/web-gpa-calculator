<template>
  <div class="wrapperx">
    <v-toolbar dense color="#002857">
      <v-toolbar-title>GPA Calculator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="calculateGP" text v-if="coursesDone.length > 0">
        Calculate
      </v-btn>
    </v-toolbar>
    <v-simple-table
      align="center"
      justify="center"
      fixed-header
      height="calc(100vh - 50px)"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Course</th>
            <th class="text-left">Grade</th>
            <th class="text-left">Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, index) in coursesDone"
            :key="index"
            @click="showEditCourse(index)"
          >
            <td>{{ course.code }}</td>
            <td>{{ course.grade }}</td>
            <td>{{ course.credit }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <br />
    <v-btn
      color="#002857"
      fab
      dark
      class="float-btn"
      @click="addCourseDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-bottom-sheet
      scrollable
      width="95%"
      max-width="450px"
      inset
      v-model="addCourseDialog"
    >
      <v-card>
        <v-card-title>Add Course</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <br />

          <!-- <v-combobox
            name="Course Code"
            label="course code"
            item-text="code"
            item-value="code"
            type="text"
            v-model="input_course_code"
            :items="availableCourses"
            color="#002857"
            append-icon=""
            rounded
            outlined
          ></v-combobox> -->

          <v-text-field
            name="Course Code"
            label="course code"
            type="text"
            v-model="input_course_code"
            color="#002857"
            rounded
            outlined
          ></v-text-field>

          <v-select
            name="Grade"
            label="Grade"
            outlined
            type="text"
            :items="availableGrades"
            item-text="grade"
            append-icon=""
            small
            v-model.trim="input_course_grade"
            color="#002857"
            rounded
          ></v-select>

          <!-- <v-combobox
            name="Credit"
            label="credit"
            outlined
            type="number"
            :items="availableCredits"
            v-model.trim="input_course_credit"
            color="#002857"
            append-icon=""
            rounded
          ></v-combobox> -->
          <v-select
            name="Credit"
            label="credit"
            outlined
            :items="availableCredits"
            type="number"
            append-icon=""
            v-model.trim="input_course_credit"
            color="#002857"
            rounded
          ></v-select>
        </v-card-text>

        <v-card-actions
          v-if="
            input_course_code != '' &&
            input_course_grade != '' &&
            input_course_credit != ''
          "
        >
          <v-btn @click="ADD_COURSE" color="#002857" block rounded> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <v-bottom-sheet
      scrollable
      width="95%"
      max-width="450px"
      inset
      v-model="editCourseDialog"
    >
      <v-card>
        <v-card-title>Edit Course</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <br />
          <!-- 
          <v-combobox
            name="Course Code"
            label="course code"
            item-text="code"
            type="text"
            v-model="edit_course_code"
            :items="availableCourses"
            color="#002857"
            append-icon=""
            rounded
            outlined
          ></v-combobox> -->

          <v-text-field
            name="Course Code"
            label="course code"
            type="text"
            v-model="edit_course_code"
            color="#002857"
            rounded
            outlined
          ></v-text-field>

          <v-select
            name="Grade"
            label="Grade"
            outlined
            type="text"
            append-icon=""
            :items="availableGrades"
            item-text="grade"
            small
            v-model.trim="edit_course_grade"
            color="#002857"
            rounded
          ></v-select>

          <!-- <v-combobox
            name="Credit"
            label="credit"
            outlined
            type="number"
            :items="availableCredits"
            v-model.trim="edit_course_credit"
            color="#002857"
            append-icon=""
            rounded
          ></v-combobox> -->

          <v-select
            name="Credit"
            label="credit"
            :items="availableCredits"
            outlined
            append-icon=""
            type="number"
            v-model.trim="edit_course_credit"
            color="#002857"
            rounded
          ></v-select>
        </v-card-text>

        <v-card-actions
          v-if="
            edit_course_code != '' &&
            edit_course_grade != '' &&
            edit_course_credit != ''
          "
        >
          <v-btn @click="EDIT_COURSE" text rounded> Save </v-btn>
          <v-btn right absolute icon @click="removeCourse">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <v-bottom-sheet
      scrollable
      width="95%"
      max-width="450px"
      inset
      v-model="resultDialog"
    >
      <v-card>
        <v-card-title> Result </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-progress-circular
            :color="degree_bgColor"
            size="50"
            :value="(this.board.gpa / 5.0) * 100"
          >
            {{ this.board.gpa }}
          </v-progress-circular>

          <span class="gp_class"> {{ this.board.degree }} </span><br /><br />

          <div class="courses_result">
            <v-chip
              :color="getColor(course.grade)"
              style="margin: 2px"
              v-for="(course, index) in coursesDone"
              :key="index"
              small
              >{{ course.code }}</v-chip
            >
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCourseDialog: false,
      editCourseDialog: false,
      resultDialog: false,
      coursesDone: [],
      input_course_code: "",
      input_course_credit: "",
      input_course_grade: "",
      // availableCourses: [
      //   { code: 'MTH230', credit: 3 },
      //   { code: 'MTH212', credit: 3 },
      //   { code: 'MTH218', credit: 3 },
      //   { code: 'MTH219', credit: 3 },
      //   { code: 'MTH214', credit: 3 },
      //   { code: 'MTH210', credit: 3 },
      //   { code: 'MTH228', credit: 3 },
      //   { code: 'MTH229', credit: 3 },
      //   { code: 'MTH223', credit: 3 },
      //   { code: 'MTH222', credit: 3 },
      //   { code: 'MTH217', credit: 3 },
      //   { code: 'MTH227', credit: 3 },
      //   { code: 'MKT211', credit: 3 },
      //   { code: 'BUS221', credit: 3 },
      //   { code: 'BUS212', credit: 3 },
      //   { code: 'CSC212', credit: 3 },
      // ],
      availableGrades: [
        { grade: "A", score: 5 },
        { grade: "B", score: 4 },
        { grade: "C", score: 3 },
        { grade: "D", score: 2 },
        { grade: "E", score: 1 },
        { grade: "F", score: 0 },
      ],
      availableCredits: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      edit_course_code: "",
      edit_course_credit: "",
      edit_course_grade: "",
      editIndex: -1,
      board: {
        totalCredit: 0,
        totalAccumulatedCredits: 0,
        totalGrades: 0,
        totalFailedCourses: 0,
        totalPassedCourses: 0,

        totalFailedCredits: 0,
        totalPassedCredits: 0,

        gpa: 0,
        degree: "",
      },
      degree_bgColor: "#000",
      degree_textColor: "#fff",
    };
  },

  methods: {
    ADD_COURSE() {
      // if (typeof this.input_course_credit !== 'number') {
      //   alert('Invalid credit score')
      //   return
      // }

      this.coursesDone.push({
        code:
          typeof this.input_course_code === "object"
            ? this.input_course_code.code
            : this.input_course_code, //dot notation to get val from object
        grade: this.input_course_grade,
        credit: this.input_course_credit,
        grade_score:
          this.getCourseScore(this.input_course_grade)[0].score *
          this.input_course_credit,
        raw_grade_score: this.getCourseScore(this.input_course_grade)[0].score,
      });

      // console.log(this.getCourseScore(this.input_course_grade)[0].score)

      this.addCourseDialog = false;

      this.input_course_code = "";
      this.input_course_credit = "";
      this.input_course_grade = "";

      // console.log(JSON.stringify(this.board, null, 2))
    },

    getCourseScore(name) {
      return this.availableGrades.filter(function (item) {
        return item.grade.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });
    },

    showEditCourse(index) {
      this.editCourseDialog = true;
      this.editIndex = index;

      this.edit_course_code = this.coursesDone[index].code;
      this.edit_course_credit = this.coursesDone[index].credit;
      this.edit_course_grade = this.coursesDone[index].grade;
    },

    EDIT_COURSE() {
      var edited = {
        code: this.edit_course_code,
        grade: this.edit_course_grade,
        credit: this.edit_course_credit,
        grade_score:
          this.getCourseScore(this.edit_course_grade)[0].score *
          this.edit_course_credit,
        raw_grade_score: this.getCourseScore(this.edit_course_grade)[0].score,
      };

      console.log("edited " + JSON.stringify(edited, null, 2));

      this.coursesDone.splice(this.editIndex, 1, edited);

      // this.coursesDone[this.editIndex].code =

      // this.coursesDone[this.editIndex].grade =
      // this.coursesDone[this.editIndex].credit =
      // this.coursesDone[this.editIndex].grade_score =

      this.editCourseDialog = false;
    },

    removeCourse() {
      this.editCourseDialog = false;
      this.coursesDone.splice(this.editIndex, 1);
    },

    calculateGP() {
      this.stormArray();

      var num = this.board.totalAccumulatedCredits / this.board.totalCredit;

      var clean = Math.round(num * 100) / 100;
      var test = 2.8888;
      this.board.gpa = clean.toFixed(1);

      this.resultDialog = true;

      this.getDegree(this.board.gpa);
    },

    stormArray() {
      this.board.totalCredit = 0;
      this.board.totalGrades = 0;
      this.board.totalAccumulatedCredits = 0;

      this.board.totalPassedCredits = 0;
      this.board.totalFailedCredits = 0;

      this.board.totalPassedCourses = 0;
      this.board.totalFailedCourses = 0;
      for (var i = 0; i < this.coursesDone.length; i++) {
        this.board.totalCredit += this.coursesDone[i].credit;
        this.board.totalGrades += this.coursesDone[i].raw_grade_score;

        this.board.totalAccumulatedCredits += this.coursesDone[i].grade_score;

        if (this.coursesDone[i].grade_score == 0) {
          this.board.totalFailedCourses += 1;
          this.board.totalFailedCredits += this.coursesDone[i].credit;
        } else {
          this.board.totalPassedCourses += 1;
          this.board.totalPassedCredits += this.coursesDone[i].credit;
        }
      }

      console.log(
        JSON.stringify(
          {
            total_credits: this.board.totalCredit,
            total_passed_credits: this.board.totalPassedCredits,
            total_failed_credits: this.board.totalFailedCredits,
            total_grades: this.board.totalGrades,
            total_accumulated_credits: this.board.totalAccumulatedCredits,
            total_passed_courses: this.board.totalPassedCourses,
            total_failed_courses: this.board.totalFailedCourses,
          },
          null,
          2
        )
      );
    },

    getColor(grade, gp) {
      if (grade == "A") {
        return "green";
      } else if (grade == "B") {
        return "green";
      } else if (grade == "C") {
        return "lightgrey";
      } else if (grade == "D" || grade == "E" || grade == "F") {
        return "red";
      }
    },

    getDegree(score) {
      if (score >= 4.5) {
        this.board.degree = "First Class !!! 👍";

        this.degree_bgColor = "green";
        this.degree_textColor = "green";
      } else if (score >= 3.5 && score < 4.49) {
        this.board.degree = "Second Class Upper !! 👍";

        this.degree_bgColor = "green";
        this.degree_textColor = "green";
      } else if (score >= 2.4 && score < 3.49) {
        this.board.degree = "Second Class Lower ! ✊ ";

        this.degree_bgColor = "yellow";
        this.degree_textColor = "black";
      } else if (score <= 2.39 && score > 1.5) {
        this.board.degree = "Third Class 😯";

        this.degree_bgColor = "red";
        this.degree_textColor = "black";
      } else if (score >= 1.0 && score < 1.49) {
        this.board.degree = "Pass 😓";

        this.degree_bgColor = "red";
        this.degree_textColor = "red";
      } else if (score < 0.99) {
        this.board.degree = "Fail 😭";

        this.degree_bgColor = "red";
        this.degree_textColor = "red";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapperx {
  width: 100vw;
  height: 100vh;
}

.float-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.custom-input {
  border-radius: 50px 0px 0px 50px;
}

.custom-input-2 {
  border-radius: 0px 50px 50px 0px;
}

.gp_class {
  font-weight: bold;
}

.courses_result {
  word-spacing: 1px;
}
</style>