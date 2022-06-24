using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace BuoiHocThu4
{
    public class BuoiHocT4 : MonoBehaviour
    {
        // int[] scoreArray;
        // int [] scoreArray = new int[10];
        // int[] scoreArray = new int[] { 1, 2, 3 };
        // int[] scoreArray  = {1,2,3,4};

        float[,] secondArray;

        int[] scoreArray = { 0, 1, 2, 3, 4, 5 };
        // float[,] secondArray = new float[2, 5];
        /* float[,] secondArray = new float[,]
          {
              {1.2f , 1.3f },
              {2.1f , 2.2f },
              {3.5f,7.6f  }

          };
          */






        // Start is called before the first frame update
        void Start()
        {

            // secondArray = new float[4, 5];
            secondArray = new float[,]

            {
        {1.2f , 1.3f },
        {2.1f , 2.2f },
        {3.5f,7.6f  }

            };
            // Debug.Log(secondArray.Length);
            /*  Debug.Log($" so dong cua mang {secondArray.GetLength(0) } ," + $"so cot cua mang {secondArray.GetLength(1)}");*/

            /*    for (int i = 0; i < secondArray.GetLength(0); i++)
                {
                    for (int j = 0; j < secondArray.GetLength(1); j++)

                        Debug.Log(secondArray[i, j]);


                } */

            /*  int row = 0;
              int col = 0;

              while (row < secondArray.GetLength(0))
              {

                  while (col < secondArray.GetLength(1))
                  {

                      Debug.Log(secondArray[row, col ]);

                      col++;


                  }
                  col = 0;
                  row++;
              }
              */

            /*  foreach (int temp in scoreArray)
              {
                  Debug.Log(temp);
              }
            */

            /* for (int i = scoreArray.Length - 1; i > 0 ; i--)
             {



                 //  Debug.Log(scoreArray[i]);

                 Debug.Log($"phan tu lien truoc cua {scoreArray[i]} la : {scoreArray[i-1]} ");

                 if (i < scoreArray.Length - 1)
                 {



                     Debug.Log($"phan tu lien sau cua {scoreArray[i]} la  {scoreArray[i+1]}" );
                 }



             }
            */


            /* for (int i = 0; i < scoreArray.Length; i++)
             {
                 scoreArray[i] = 9;


                 Debug.Log(scoreArray[i]);
             }
            */

            foreach (var temp in scoreArray)
            {
                Debug.Log(temp);
            }




            /*
            // Debug.Log(scoreArray.Length); 
            // scoreArray = new int[10];
            // scoreArray = new int[] { 1, 2, 3 };
             scoreArray = new int[] { 23, 52, 43 ,34 ,90 };

            /*  Debug.Log(scoreArray[0]);
              Debug.Log(scoreArray[1]);
              Debug.Log(scoreArray[2]);
            */

            // for (int i = 0; i < 3; i++)
            /*  for (int i = 0; i < scoreArray.Length; i++)
              {
                  Debug.Log(scoreArray[i]);
              }

              */

            /*   int cout = 0;
               while (cout < scoreArray.Length)
               {

                   Debug.Log(scoreArray[cout]);
                   cout++;



               }
              */

           /* int cout = 0;
            do
            {
                Debug.Log(scoreArray[cout]);
                cout++;



            } while (cout < scoreArray.Length);

            */


        }

        // Update is called once per frame
        void Update()
        {

        }
    }
}
