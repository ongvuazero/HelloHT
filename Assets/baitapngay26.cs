using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baitapngay26 : MonoBehaviour
{
    // 10 9 8 7 6 5 4 3 2 1


    // Start is called before the first frame update
    void Start()
    {
      
    }
    void khongtrave() 
    {

        float tong = 0;
        for (int i = 0; i < 10; i--)
        {
            tong = tong + i;
            Debug.Log(tong);
        }


    }
    float hamtravegiatri() 
    {
        float tong = 0;
        for (int i = 0; i < 10; i--)
        {
            tong = tong + i;
            Debug.Log(tong);
        }

        return tong;
    }
    void khongtrave1()
    {

        float tong = 0;
        for (int i = 0; i < 10; i--)
        {  if ((i % 2) == 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }


    }
    float hamtravegiatri1()
    {
        float tong = 0;
        for (int i = 0; i < 10; i--)
        {
            if ((i % 2) == 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }
        return tong;
    }
    void khongtrave2()
    {

        float tong = 0;
        for (int i = 0; i < 10; i--)
        {
            if ((i % 2) != 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }


    }
    float hamtravegiatri2()
    {
        float tong = 0;
        for (int i = 0; i < 10; i--)
        {
            if ((i % 2) != 0)
            {
                tong = tong + i;
                Debug.Log(tong);
            }
        }
        return tong;
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
