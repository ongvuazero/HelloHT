using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baitapngay26 : MonoBehaviour
{
    // 10 9 8 7 6 5 4 3 2 1
    

    // Start is called before the first frame update
    void Start()
    {

        /*
          float sochanle = 0;
          for (int i = 10; i > 0; i--)
          {

              if ((i % 2) == 0 && i < 8)
              {
                  sochanle = i;
                  Debug.Log(sochanle);
              }
              else if ((i % 2) != 0 && i < 7)
              {
                  sochanle = i;
                  Debug.Log(sochanle);
              }
          }
        */
        //TinhTong();
        // TimSoChanLe();
    }
     void TinhTong() 
    {

        float tong = 0;
        for (int i = 10; i > 0; i--)
        {
           

            tong = tong + i;
            Debug.Log(tong);
        }
       
    }
    float TinhTongTraVe() 
    {
        float tong = 0;
        for (int i = 10; i > 0; i--)
        {
            tong = tong + i;
            Debug.Log(tong);
        }

        return tong;
    }
    void TinhTongSoChan()
    {

        float tong = 0;
        for (int i = 10; i > 0; i--)
        {  if ((i % 2) == 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }


    }
    float TinhTongSoChanTraVe()
    {
        float tong = 0;
        for (int i = 10; i > 0; i--)
        {
            if ((i % 2) == 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }
        return tong;
    }
    void TinhTongSoLe()
    {

        float tong = 0;
        for (int i = 10; i > 0; i--)
        {
            if ((i % 2) != 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }


    }
    float TinhTongSoLeTrave()
    {
        float tong = 0;
        for (int i = 10; i > 0; i--)
        {
            if ((i % 2) != 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }
        return tong;
    }

     void TimSoChanLe()
    {
        for (int i = 10; i > 0; i--)
        {
            if ((i % 2) == 0 && i < 8)
            {

                Debug.Log("so chan nho hon 8 la " +i);


            }
            else if ((i%2)!=0 && i < 7 )       
            {

                Debug.Log("so le nho hon 7 la " + i);
            
            }
    }
        

    }

 

    // Update is called once per frame
    void Update()
    {
        
    }
}
