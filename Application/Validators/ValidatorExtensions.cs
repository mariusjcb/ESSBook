using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                    .NotEmpty()
                    .MinimumLength(6).WithMessage("Password must be at least 6 chars.")
                    .Matches("[A-Z]").WithMessage("Password must contain at least one uppercased.")
                    .Matches("[a-z]").WithMessage("Password must contain at least one lowercased.")
                    .Matches("[0-9]").WithMessage("Password must contain at least one number.")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non-alphanumeric.");
            return options;
        }
    }
}