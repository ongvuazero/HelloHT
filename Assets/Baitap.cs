using System.Collections;
using System.Collections.Generic;
using UnityEngine;




public class BaiTap : MonoBehaviour
{


    int[] ScoreArray = { 1, 2, 4, 2, 6, 1, 7, 8, 6, 5 };

   
    

       // Start is called before the first frame update
            void Start()
    {
        for (int i = 0; i < ScoreArray.Length; i++)

           
        {

            
            if (i == ScoreArray[i])
                Debug.Log($"so trung nhau {ScoreArray[i]}");
            else
            {
                if (i != ScoreArray[i] )
                Debug.Log($"so khac nhau {ScoreArray[i]}");
            
            }

            

        }



    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
