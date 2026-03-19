using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.RegularUser.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IRegularUserRepository _regularUserRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IRegularUserRepository regularUserRepository, ILogger<AddHandler> logger)
        {
            _regularUserRepository = regularUserRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var regularUser = new Domain.Entities.RegularUser
            {
                Id = request.UserId
            };

            await _regularUserRepository.AddAsync(regularUser, cancellationToken);

            return new AddResponse(regularUser.Id);
        }
    }
}
