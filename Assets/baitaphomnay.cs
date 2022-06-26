using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace baitaphomnay
{


    public class baitaphomnay : MonoBehaviour
    {
        int a = 5;
        int c;
        int b = 6;
        // Start is called before the first frame update
        void Start()
        {
            /*
              if (c == 3)
              {
                  

              }
              else if (c == 7) 

              {
                  var tinhhieu = (a - b);
                  Debug.Log(tinhhieu);
              }

              else
              {
                  var tinhtich = (a * b);
                  Debug.Log( tinhtich );

              }

              */




            // Khongtravegiatri(a,b);


            float ketquaz = Tinhtich(7,3);           
            Debug.Log(ketquaz);
          



        }

        void Khongtravegiatri(int a, int b)
        {
            if (a == b)
            {
                Debug.Log("xin chao");
            }
            else if (a != b)
                Debug.Log("xin loi");
        }
        float Tinhtich(int a, int b)
        {

            float ketqua = 0;
            ketqua = a * b;
            return ketqua;

        }

       



        // void Tinhtoan(int pheptinh, int a , int b) 
        float Tinhtoan(int pheptinh, int a, int b)
        {
            float ketqua = 0;
            switch (pheptinh)
            {
                case 1:
                    ketqua = (a + b);
                  //  Debug.Log(ketqua);
                    break;
                case 2:
                    ketqua = (a - b);
                 //   Debug.Log(ketqua);
                    break;
                case 3:
                    ketqua = (a * b);
                  //  Debug.Log(ketqua);
                    break;
                case 4:

                    ketqua = ((float)a / b);
                  //  Debug.Log(ketqua);
                    break;

            }

            return ketqua;





        }


     




        // Update is called once per frame
        void Update()
        {

        }

    }
}


