

      if (year_condition === year) {
        if (mounth_condition === mounth) {
          if (day_condition === day) {
              res += 1;
              cycleEnd();
            } else cycleEnd();
          } else cycleEnd();
        } else cycleEnd();

if ( year_condition === year &&
     mounth_condition === mounth &&
     day_condition === day )
