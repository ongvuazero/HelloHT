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
        float ketqua1z = ham3thamso1z(7, 6);
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


    float ham3thamso1z (int a, int b)
    {
        float pheptinh3;
        int c = 0;
        if (c == 2)
        {
            pheptinh3 = (a + b + c);
            Debug.Log(pheptinh3);
        }
        else if (c == 7)
        {
            pheptinh3 = (a * b * c);
            Debug.Log(pheptinh3);
        }
        else if (c == 1)
        {
            pheptinh3 = (a - b - c);
            Debug.Log(pheptinh3);
        }
        else if (c==10)
        {
            pheptinh3 = ((a / b) / c);
            Debug.Log(pheptinh3);
        }
        else if (c==12)
        {
            pheptinh3 = (a + c);
            Debug.Log(pheptinh3);
        }



    }



    // Update is called once per frame
    void Update()
    {
        
    }
}
