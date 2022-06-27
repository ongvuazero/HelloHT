using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class baitapvenha1 : MonoBehaviour
{


    // Start is called before the first frame update
    void Start()
    {
        khongtravegiatri(5, 6);
       float ketqua = travegiatri(6, 7);
        Debug.Log(ketqua);
        ham2thamso(5, 6);
        ham2thamso2(7, 6);
        ham3thamso(20, 6);
        float ketqua1z = ham3thamso1z(2,7, 6,8);
        tinhtoan3(2,10, 6,8);

    }
    void khongtravegiatri(int a, float b)
    {
        float tinhtong;
        tinhtong = (a + b);
        Debug.Log(tinhtong);
    }

    float travegiatri(int a, int b)
    {
        float tinhtong1 = 0;
        tinhtong1 = (a + b);
        return tinhtong1;
    }

    void ham2thamso(int a, float b)
    {
        if (a > b)
        {
            float pheptinh1 = ((a + a) * b);
            Debug.Log(pheptinh1);
        }
        else if (a < b)
        {
            float pheptinh2 = ((a * a) - b);
            Debug.Log(pheptinh2);

        }
    }
    float ham2thamso2(int a, int b)
    {
        float ketquabai2 = 0;
        if (a > b)
        {
            ketquabai2 = ((a + a) * b);
        }
        else if (a < b)
        {
            ketquabai2 = ((a * a) - b);
        }
        return ketquabai2;
    }

    void ham3thamso(int a, int b)
       
    {
        int c = 0 ;
        float ketqua3 = 0;
        if (c == 2)
        {
            ketqua3 = (a + b + c);
          Debug.Log(ketqua3);

        }
        else if (c == 7) 
        {
            ketqua3 = (a * b * c);
            Debug.Log(ketqua3);
        }
        else if ( c== 1) 
        {
            ketqua3 = (a - b - c);
            Debug.Log(ketqua3);
        } 
        else if (c==10) 
        {
            ketqua3 = ((a / b )/ c);
            Debug.Log(ketqua3);
        }
        else if (c == 12) 
        {
            ketqua3 = (c + a);
            Debug.Log(ketqua3);
        }

    }


    float ham3thamso1z(float pheptinh, int a, int b,int c)
    {
        
        float ketqua3 = 0;
        switch (pheptinh) 
        {
            case 2:
                ketqua3 = (a * b * c);
                break;
            case 7:
                ketqua3 = (a * b * c);
                break;
            case 1:
                ketqua3 = (a - b - c);
                break;
            case 10:
                ketqua3 = ((a / b) / c);
                break;
            case 12:
                ketqua3 = (c + a);
                break;

        }
        return ketqua3;
    }

    void tinhtoan3(int ketqua4,int a, int b,int c) 
    {
         
        float pheptinh4;
        switch (ketqua4)
        {
            case 2:
                pheptinh4 = (a * b * c);
                break;
            case 7:
                pheptinh4 = (a * b * c);
                break;
            case 1:
                pheptinh4 = (a - b - c);
                break;
            case 10:
                pheptinh4 = ((a / b) / c);
                break;
            case 12:
                pheptinh4 = (c + a);
                break;


        }




    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
