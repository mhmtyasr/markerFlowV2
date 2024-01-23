using MarkerFlow.Debugging;

namespace MarkerFlow
{
    public class MarkerFlowConsts
    {
        public const string LocalizationSourceName = "MarkerFlow";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "3fabb3f0c1fd4331bccea98208dada49";
    }
}
