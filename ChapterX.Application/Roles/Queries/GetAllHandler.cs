using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Roles.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IRolesRepository _rolesRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IRolesRepository rolesRepository, ILogger<GetAllHandler> logger)
        {
            _rolesRepository = rolesRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var roles = await _rolesRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(roles);
        }
    }
}
