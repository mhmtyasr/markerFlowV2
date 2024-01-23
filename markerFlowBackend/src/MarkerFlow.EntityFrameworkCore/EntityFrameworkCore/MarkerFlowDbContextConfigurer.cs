using System;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MarkerFlow.EntityFrameworkCore
{
    public static class MarkerFlowDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MarkerFlowDbContext> builder, string connectionString)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MarkerFlowDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
