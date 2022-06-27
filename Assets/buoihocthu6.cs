using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class buoihocthu6 : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

       

        //1 2 3 4 5 6 7 8 9 10 11 12
        //tim cac so chan , roi in ra ket qua , biet rang cac so chan chia het so2
      /* for (int i = 1; i <= 12; i++)
        {
            if ( (i % 2 ) == 0  ) 
            {
                Debug.Log(i);
            
            }
            
        }
   */
        int dem = 0; 
        while (dem < 12 )
        {     
            dem++;
            if ( (dem % 2) != 0 ) 
            {
                Debug.Log(dem);
            }

            
        }
     
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
