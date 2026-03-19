using MediatR;

namespace ChapterX.Application.RegularUser.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
