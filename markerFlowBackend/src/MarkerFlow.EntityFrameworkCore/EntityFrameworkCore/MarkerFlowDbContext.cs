using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MarkerFlow.Authorization.Roles;
using MarkerFlow.Authorization.Users;
using MarkerFlow.MultiTenancy;
using System;
using Abp.Localization;
using System.Reflection;
using MarkerFlow.Topics;

namespace MarkerFlow.EntityFrameworkCore
{
    public class MarkerFlowDbContext : AbpZeroDbContext<Tenant, Role, User, MarkerFlowDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public MarkerFlowDbContext(DbContextOptions<MarkerFlowDbContext> options)
            : base(options)
        {

            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<Topics.Topics> Topics { get; set; }
        public DbSet<Comments.Comments> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<User>().Navigation(e => e.Roles).AutoInclude();

            base.OnModelCreating(modelBuilder);
        }
    }
}
