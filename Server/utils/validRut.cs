using System.Text.RegularExpressions;

namespace Server.utils
{
    public class validRut
    {
    public static string ValidarDV(string rut)
    {
        int suma = 0;
        int multiplo = 2;

        for (int i = rut.Length - 1; i >= 0; i--)
        {
            suma += int.Parse(rut[i].ToString()) * multiplo;
            multiplo = multiplo == 7 ? 2 : multiplo + 1;
        }

        int dvCalculado = 11 - (suma % 11);

        if (dvCalculado == 11)
        {
            dvCalculado = 0;
        }
        else if (dvCalculado == 10)
        {
            return "K";
        }

        return dvCalculado.ToString();
    }

    // Validar el RUT
    public static bool IsValidRUT(string rutCompleto)
    {
        var regex = new Regex(@"^\d{1,2}(\.\d{3}){2}-[0-9kK]{1}$");

        if (!regex.IsMatch(rutCompleto))
        {
            return false;
        }

        // Eliminar puntos y guion
        string rutSinFormato = rutCompleto.Replace(".", "").Replace("-", "");
        string rutNumerico = rutSinFormato.Substring(0, rutSinFormato.Length - 1);
        string dv = rutSinFormato.Substring(rutSinFormato.Length - 1);

        // Validar el dígito verificador
        string dvCalculado = ValidarDV(rutNumerico);
        return dv.ToUpper() == dvCalculado.ToUpper();
    }
    }
}