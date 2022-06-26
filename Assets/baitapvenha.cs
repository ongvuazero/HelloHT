using System.Collections;
using System.Collections.Generic;
using UnityEngine;



namespace baitapvenha
{
    public class baitapvenha : MonoBehaviour
    {

        int [] mang ={1, 2, 4, 2, 6, 1, 7, 8, 6, 5 };





        // Start is called before the first frame update
        void Start()
        { }
        void timsogiongnhautrongmang(int[] mang)
            {
                for (int i = 0; i < mang.Length; i++)

                {
                    var pt01 = mang[i];

                    for (int j = 0; j < mang.Length; j++)
                    {

                        var pt02 = mang[j];

                        if (pt01 == pt02 && i != j)
                            Debug.Log($"cac so phan tu giong nhau {pt01}");



                    }



                }
            }












        

        // Update is called once per frame
        void Update()
        {

        }
    }

}
