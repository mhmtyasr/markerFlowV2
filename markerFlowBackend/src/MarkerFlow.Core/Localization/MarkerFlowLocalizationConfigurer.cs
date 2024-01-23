using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace MarkerFlow.Localization
{
    public static class MarkerFlowLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(MarkerFlowConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(MarkerFlowLocalizationConfigurer).GetAssembly(),
                        "MarkerFlow.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
