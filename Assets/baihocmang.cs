using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baihocmang : MonoBehaviour
{

    // int[] mang = { 21, 7, 8, 10, 11, 9, 89 };

    float[,] mang =
    {
       { 21, 7, 8, 10, 11, 9, 89 },
       {15, 9  ,85 , 7 ,6 ,24, 36 },
       {36, 79 ,85, 11,45,78, 98 },
       {26,75, 86 ,14 ,44 ,59 ,64 }
    };




    // Start is called before the first frame update
    void Start()
    {
        int dong = 0;
        int cot = 0;
        while (dong < mang.GetLength(0)) 
        {
            cot = 0;
            while (cot < mang.GetLength(1))
            {

                Debug.Log(mang[dong, cot]);
                cot++;
               
            };
            dong++ ;
        };


































      /*  float tong = 0;
        for (int i = 0; i < mang.GetLength(0); i++)
        {
          //  Debug.log(mang[i]);
          

            for (int j = 0; j < mang.GetLength(1); j++)
            {

                if ((mang[i,j]%2==0 )) 
                {
                    tong = tong + mang[i, j];
                    Debug.Log(tong);

                }
                

            }
        }
        
        */
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        /*  int dem = 0; // chi so 
        int tong = 0; 

        while ( dem < mang.Length ) 
        {
            if ((mang[dem]%2)== 0 ) 
           {

                Debug.Log(mang[dem]);
            
            }
            
           // tong = mang[dem]+ tong;
          //  Debug.Log(tong);
            dem++;
        }

        for (int i = 0; i < mang.Length; i++)
        {
            Debug.Log(mang[i]);
        }


       
        */
    }
    



    // Update is called once per frame
    void Update()
    {
        
    }
}
