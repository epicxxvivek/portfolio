#include<stdio.h>
int main() {
    int i;

    // Using a for loop to print numbers from 1 to 10
    printf("For Loop:\n");
    for(i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\n");

    // Using a while loop to print numbers from 1 to 10
    printf("While Loop:\n");
    i = 1;
    while(i <= 10) {
        printf("%d ", i);
        i++;
    }
    printf("\n");

    // Using a do-while loop to print numbers from 1 to 10
    printf("Do-While Loop:\n");
    i = 1;
    do {
        printf("%d ", i);
        i++;
    } while(i <= 10);
    printf("\n");

    return 0;
}